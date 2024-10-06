import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from "react-router-dom";
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
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting ] = useState(false);
    const [projectData, setProjectData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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

    async function handleDeleteUser() {
        setDeleting(true)
        try{
            await api.delete(`/project/delete/${id}`);

            toast.success("Projeto deletado com sucesso");
            navigate('/projects');
        }catch (error){
            toast.error("Erro ao deletar o projeto");
        }finally {
            setDeleting(false);
        }
    }

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
            const response = await api.put(`/project/update/${id}`, formData, {
                headers: {

                },
            });
            navigate('/projects');
            console.log(response)
            toast.success("Projeto atualizado com sucesso");
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

            <Grid2 container spacing={2}>
                <Grid2 size={6} sx={{ padding: '140px' }}>
                    {imagePreview ? (
                        <Box
                            component="img"
                            src={imagePreview}
                            alt="Imagem de preview"
                            sx={{
                                display: 'flex',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                position: 'relative',
                                overflow: 'hidden',
                                width: '550px',
                                height: '465px',
                                padding: '150px',
                            }}

                        />
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                position: 'relative',
                                width: '100%',
                                padding: '150px',
                            }}

                        />
                    )}

                    <TextField
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                    />


                </Grid2>

                <Grid2 size={6}>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(handleEditProject)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: ' 80px 37px',
                        }}
                    >

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
                                placeholder='Descreva seu projeto'
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

                        <Grid2 container spacing={2}>
                            <Grid2 size={6}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',   
                                    gap: '2rem'   
                                }}
                            >
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


                                <Button
                                    disabled={deleting}
                                    type="button"
                                    onClick= {handleDeleteUser}
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#A3A2A2',
                                        height: '3.5rem',
                                        width: '300px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    {deleting ? <CircularProgress size={24} /> : "Excluir projetos"}
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}
