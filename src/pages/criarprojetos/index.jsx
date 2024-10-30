import { z } from "zod";
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { ModalAiProject } from './modal';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload, Delete, SmartToy } from "@mui/icons-material";
import { Box, Grid2, TextField, Typography, Button, CircularProgress, Select, FormControl, InputLabel, Card, CardMedia, Stack } from '@mui/material';

const postFormSchema = z.object({
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(300, "Minimo de 300 Caracteres"),
    categoryProjectId: z.string().nonempty("A categoria é obrigatória"),
    file: z
        .instanceof(FileList, "Imagem obrigatoria")
        .refine((files) => files?.length > 0, "Imagem é obrigatória")
        .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "O arquivo deve ter no máximo 5MB")
        .refine(
            (files) => ["image/jpg", "image/png", "image/jpeg"].includes(files[0]?.type),
            "Formato de arquivo inválido. Apenas JPG, PNG ou JPEG são permitidos."
        )
});
export function CriarProjetos() {
    const [open, setOpen] = useState(false);
    const [, setFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(postFormSchema),
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchCategory = async () => {
        try {
            const response = await api.get('/category');
            setCategory(response.data);
        } catch {
            toast.error("Erro ao carregar categorias");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    async function handleCreateProject(data) {
        setLoading(true);

        const formData = new FormData();

        formData.append("description", data.description);
        formData.append('name', data.name);
        formData.append('categoryProjectId', data.categoryProjectId);

        if (data.file) {
            formData.append('project-image', data.file[0]);
        }

        try {
            await api.post(`/project/create/${user.Ong.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/projects');
            toast.success("Projeto criado com sucesso, aguarde a confirmação do administrador");
        } catch {
            toast.error("Erro ao criar o projeto");
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

    const handleAiProjectSubmit = (data) => {
        setValue('name', data.title, { shouldValidate: true });
        setValue('description', data.description, { shouldValidate: true });
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', my: '2rem' }}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant='h3' sx={{ fontSize: '26px', color: '#22703E', fontWeight: '700' }}>
                    Criar Projeto
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    endIcon={<SmartToy />}
                >
                    Criar o projeto com IA
                </Button>
            </Stack>

            <Box component='form' onSubmit={handleSubmit(handleCreateProject)}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    fullWidth
                                    id="projectName"
                                    variant="outlined"
                                    placeholder="Titulo do Projeto"
                                    size="small"
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {category && (
                                    <FormControl fullWidth error={!!errors.categoryProjectId}>
                                        <InputLabel id="category-label">Categoria</InputLabel>
                                        <Select
                                            label="Categoria"
                                            labelId="category-label"
                                            id="category"
                                            defaultValue={""}
                                            {...register("categoryProjectId", {
                                                required: "A categoria é obrigatória",
                                            })}
                                            size="medium"
                                        >
                                            {Array.isArray(category) && category.length > 0 ? (
                                                category.map((cat) => (
                                                    <MenuItem key={cat.id} value={String(cat.id)}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="" disabled>
                                                    Carregando categorias...
                                                </MenuItem>
                                            )}
                                        </Select>
                                        {errors.categoryProjectId && (
                                            <Typography color="error">{errors.categoryProjectId.message}</Typography>
                                        )}
                                    </FormControl>
                                )}

                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    {...register("description")}
                                    error={!!errors.description}
                                    helperText={errors?.description?.message}
                                    fullWidth
                                    multiline
                                    id="description"
                                    placeholder="Descrição do projeto (visivel aos doadores)"
                                    rows={5}
                                    size="small"
                                />
                            </Box>

                        </Box>
                    </Grid2>

                    <Grid2 size={12} container spacing={2}>
                        {imagePreview && (
                            <Grid2 size={12}>

                                <Card variant="outlined" sx={{ height: '200px' }}>
                                    <CardMedia
                                        component="img"
                                        image={imagePreview}
                                        onError={() => {
                                            setImagePreview('/semimg.png')
                                        }}
                                        sx={{
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        alt="Preview da imagem"
                                    />


                                </Card>

                            </Grid2>
                        )}


                        <Grid2 size={12}>
                            <Typography color="error">{errors?.file?.message}</Typography>
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

                                {imagePreview && (
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
                                )}
                            </Box>
                        </Grid2>

                        <Grid2 size={12} container justifyContent='end'>
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
                                {loading ? <CircularProgress size={24} /> : "Criar projeto"}
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>

            <ModalAiProject
                open={open}
                onSubmit={handleAiProjectSubmit}
                handleClose={handleClose}
            />
        </Box>
    );
}
