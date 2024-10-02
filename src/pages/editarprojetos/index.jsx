import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, TextField, Typography, Button, CircularProgress, Select, FormControl, InputLabel } from '@mui/material';

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

export function EditarProjetos() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [projectData, setProjectData] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            categoryProjectId: '',
        },
    });
    const navigate = useNavigate();
    const { user } = useAuth();

    const { id } = useParams();

    const fetchCategory = async () => {
        try {
            const response = await api.get('/category');
            setCategory(response.data);
        } catch (error) {
            toast.error("Erro ao carregar categorias");
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await api.get(`/project/one/${id}`)
            setProjectData(response.data);

        } catch (error) {
            console.log(error);
            toast.error("Projeto não existe para ser editado");
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projectData) {
            reset({
                name: projectData.name || '',
                description: projectData.description || '',
            });
        }
    }, [projectData, reset]);

    async function handleEditProject(data) {
        console.log(data);
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append('name', data.name);
        formData.append('categoryProjectId', Number(data.categoryProjectId));

        if (data.file) {
            formData.append('project-image', data.file[0]);
        }

        try {
            const response = await api.put(`/project/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate('/projects');
            console.log(response)
            toast.success("Projeto atualizado com sucesso");
        } catch (error) {
            toast.error("Erro ao atualizar o projeto");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
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
            }}>
                Editar Projeto
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Box
                        component='img'
                        src={image}
                        sx={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                        }}
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(handleEditProject)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            {...register('file')}
                        />

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant='h6'
                                component='label'
                                htmlFor="name"
                                sx={{
                                    fontSize: '16px',
                                    color: 'black',
                                    fontWeight: '700',
                                    marginBottom: '0.55rem',
                                }}>
                                Nome do Projeto
                            </Typography>

                            <TextField
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                                fullWidth
                                id="name"
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
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '0.5rem',
                                    color: 'black',
                                    fontWeight: '700',
                                }}>
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
                                placeholder='Uma breve descrição do seu projeto...'
                                rows={6}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <Typography
                                variant='h6'
                                component='label'
                                htmlFor="category"
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '0.5rem',
                                    color: 'black',
                                    fontWeight: '700',
                                }}>
                                categorias
                            </Typography>
                            <FormControl sx={{ width: '400px' }}>
                                <InputLabel id="category-label"></InputLabel>
                                <Select
                                    labelId="category-label"
                                    defaultValue=""
                                    id="category"
                                    {...register("categoryProjectId")}
                                >
                                    <MenuItem value="" disabled>
                                        <em>Selecionar uma categoria</em>
                                    </MenuItem>
                                    {Array.isArray(category) && category.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.categoryProjectId && (
                                <Typography color="error">{errors.categoryProjectId.message}</Typography>
                            )}
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
    );
}
