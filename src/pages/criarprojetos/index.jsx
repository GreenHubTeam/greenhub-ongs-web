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
import { Box, Grid2, TextField, Typography, Button, CircularProgress, Select, FormControl, InputLabel, Card, CardMedia } from '@mui/material';
import { CloudUpload, Delete } from "@mui/icons-material";

const postFormSchema = z.object({
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    categoryProjectId: z.number().min(1, "Categoria é obrigatória"),
    file: z
        .instanceof(FileList)
        .refine((files) => files?.length > 0, "Arquivo é obrigatório")
        .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "O arquivo deve ter no máximo 5MB")
        .refine(
            (files) => ["image/jpg", "image/png", "image/jpeg"].includes(files[0]?.type),
            "Formato de arquivo inválido. Apenas JPG, PNG ou JPEG são permitidos."
        )
});

export function CriarProjetos() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
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

    const modalSubmit = async (data) => { // Adicione data como argumento
        try {
            const response = await api.post('/gemini/createInfo', { description: data.description });
            toast.success('Projeto criado com sucesso!');
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error('Erro ao criar o projeto');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await api.get('/category');
            setCategory(response.data);
        } catch (error) {
            toast.error("Erro ao carregar categorias");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    async function handleCreateProject(data) {
        setLoading(true);
        console.log(data);
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append('name', data.name);
        formData.append('categoryProjectId', data.categoryProjectId);

        if (data.file) {
            formData.append('project-image', data.file[0]);
        }

        try {
            const response = await api.post(`/project/create/${user.Ong.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/projects');
            console.log(response)
            toast.success("Projeto criado com sucesso, aguarde a confirmação do administrador");
        } catch (error) {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
            <Typography variant='h3' sx={{ fontSize: '26px', color: '#22703E', fontWeight: '700' }}>
                Criar Projeto
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: '2rem' }}>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ height: '3rem', width: '250px', borderRadius: '10px' }}
                >
                    Criar o projeto com IA
                </Button>
            </Box>

            <Box component='form' onSubmit={handleSubmit(handleCreateProject)}>

                <ModalAiProject open={open} handleClose={handleClose} onSubmit={modalSubmit} />

                <Grid2 container spacing={2}>
                    <Grid2 size={6} container spacing={2}>
                        <Grid2 size={12}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img" // Use component="img" para renderizar uma imagem
                                    image={imagePreview || "/path/to/default/image.jpg"} // Imagem padrão se imagePreview for nulo
                                    sx={{ height: '100%' }}
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

                    <Grid2 size={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '40px 37px' }}>
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
                                    placeholder='Descreva o seu projeto'
                                    rows={6}
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
                                        defaultValue="" // Define um valor padrão
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
                                {loading ? <CircularProgress size={24} /> : "Criar projeto"}
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}
