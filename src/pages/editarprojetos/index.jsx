import { z } from "zod";
import { env } from "../../env";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid2, TextField, Typography, Button, CircularProgress, Select, FormControl, InputLabel, CardMedia, Card } from '@mui/material';

const postFormSchema = z.object({
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(300, "Descrição é obrigatória"),
    categoryProjectId: z.number().min(1, "Categoria é obrigatória"),
    file: z
        .instanceof(FileList)
        .optional()
        .refine((files) => {
            if (files.length === 0) return true
            return files[0]?.size <= 5 * 1024 * 1024
        }, "O arquivo deve ter no máximo 5MB")
        .refine(
            (files) => {
                if (files.length === 0) return true
                return ["image/jpg", "image/png", "image/jpeg"].includes(files[0]?.type)
            },
            "Formato de arquivo inválido. Apenas JPG, PNG ou JPEG são permitidos."
        )
});

export function EditarProjetos() {
    const [, setFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            categoryProjectId: ''
        }
    });

    const { id } = useParams();
    const navigate = useNavigate();

    async function handleDeleteProject() {
        setDeleting(true);
        try {
            await api.delete(`/project/delete/${id}`);

            toast.success("Projeto deletado com sucesso");
            navigate('/projects');
        } catch {
            toast.error("Erro ao deletar o projeto");
        } finally {
            setDeleting(false);
        }
    }

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const projects = await api.get(`/project/one/${id}`)
                const categorys = await api.get('/category');
                setCategory(categorys.data);

                reset({
                    name: projects.data.name || '',
                    description: projects.data.description || '',
                    categoryProjectId: String(projects.data.categoryProjectId)
                });

                setImagePreview(`${env.api_url}/${projects.data.imagePath}`);
            } catch {
                toast.error("Error ao buscar os dados do projeto");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();

    }, [id, reset, setValue]);

    async function handleEditProject(data) {
        setLoading(true);

        const formData = new FormData();
        formData.append("description", data.description);
        formData.append('name', data.name);
        formData.append('categoryProjectId', Number(data.categoryProjectId));

        if (data.file) {
            formData.append('project-image', data.file[0]);
        }

        try {
            await api.put(`/project/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/projects');
            toast.success("Projeto atualizado com sucesso");
        } catch {
            toast.error("Erro ao atualizar o projeto");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const previewURL = URL.createObjectURL(selectedFile);
            setImagePreview(previewURL);
            setFile(selectedFile);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '2rem'
        }}>
            <Typography variant='h3' sx={{
                fontSize: '26px',
                color: '#22703E',
                fontWeight: '700',
                gap: '1rem'
            }}>
                Editar Projeto
            </Typography>

            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px'
                    }}
                >
                    <CircularProgress color="success" />
                </Box>
            )}

            {!loading && category && (
                <Box
                    component='form'
                    onSubmit={handleSubmit(handleEditProject)}
                >
                    <Grid2 container spacing={2}>
                    <Grid2 size={12} container spacing={2}>
                        <Grid2 size={12}>
                            <Card variant="outlined" sx={{ height: '500px' }}>
                                <CardMedia
                                    component="img"
                                    image={imagePreview}
                                    sx=
                                    {{
                                        height: '100%',
                                        objectFit: 'contain', 
                                    }}
                                alt="Preview do projeto"
                                />
                            </Card>
                        </Grid2>

                        <Grid2 size={12}>
                            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUpload />}
                                >
                                    Upload da Imagem
                                    <Box
                                        component='input'
                                        type="file"
                                        {...register('file')}
                                        onInput={handleFileChange}
                                        multiple
                                        sx={{
                                            clip: 'rect(0 0 0 0)',
                                            clipPath: 'inset(50%)',
                                            height: 1,
                                            overflow: 'hidden',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            whiteSpace: 'nowrap',
                                            width: 1,
                                        }}
                                    />
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFile(null);
                                        setValue('file', null)
                                    }}
                                >
                                    Remover imagem
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>

                    <Grid2 size={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant='h6'
                                    component='label'
                                    htmlFor="projectName"
                                    sx={{ fontSize: '16px', color: 'black', fontWeight: '700', marginBottom: '0.55rem' }}
                                >
                                    Nome do Projeto
                                </Typography>

                                <TextField
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    fullWidth
                                    id="projectName"
                                    required
                                    variant="outlined"
                                    placeholder='Nome do seu projeto'
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant='h6'
                                    component='label'
                                    htmlFor="description"
                                    sx={{ fontSize: '16px', marginBottom: '0.5rem', color: 'black', fontWeight: '700' }}
                                >
                                    Descrição do projeto
                                </Typography>

                                <TextField
                                    {...register("description")}
                                    error={!!errors.description}
                                    helperText={errors?.description?.message}
                                    fullWidth
                                    required
                                    multiline
                                    id="description"
                                    placeholder='Descrição do projeto (visivel aos doadores)'
                                    rows={10}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant='h6'
                                    component='label'
                                    htmlFor="category"
                                    sx={{ fontSize: '16px', marginBottom: '0.5rem', color: 'black', fontWeight: '700' }}
                                >
                                    categorias
                                </Typography>
                                <FormControl fullWidth error={!!errors.categoryProjectId}>
                                    <InputLabel id="category-label">Selecionar uma categoria</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        {...register("categoryProjectId")}
                                        defaultValue=""
                                    >
                                        <MenuItem value="" disabled>
                                            <Box component='em'>Selecionar uma categoria</Box>
                                        </MenuItem>
                                        {Array.isArray(category) && category.length > 0 ? (
                                            category.map((cat) => (
                                                <MenuItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>Carregando categorias...</MenuItem>
                                        )}
                                    </Select>
                                    {errors.categoryProjectId && (
                                        <Typography color="error">{errors.categoryProjectId.message}</Typography>
                                    )}
                                </FormControl>
                            </Box>

                            <Button
                                disabled={loading}
                                type="submit"
                                variant='contained'
                                sx={{
                                    backgroundColor: '#22703E',
                                    height: '3.5rem',
                                    width: '300px',
                                    borderRadius: '10px',
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : "Salvar mudanças"}
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
                </Box>
            )}
        </Box >
    );
}
