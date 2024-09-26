import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, TextField, Typography, Button } from '@mui/material';

const postFormSchema = z.object({
    projectName: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    file: z
        .instanceof(FileList)
        .refine((files) => files?.length > 0, "Arquivo é obrigatório")
        .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "O arquivo deve ter no máximo 5MB")
        .refine(
            (files) => ["image/jpg", "image/png", "image/jpeg"].includes(files[0]?.type),
            "Formato de arquivo inválido. Apenas JPG, PNG ou JPEG são permitidos."
        )
});

export function Criacaopost() {
    const [image, setImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postFormSchema),
    });
    const navigate = useNavigate();

    const { user } = useAuth();

    async function handleCreateProject(data) {
        const formData = new FormData();

        formData.append("description", data.description);
        formData.append('name', data.projectName);
        formData.append('categoryProjectId', null);

        if (data.file) {
            formData.append('project-image', data.file[0]);
        }

        try {
            await api.post(`/project/create/${user.Ong.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            navigate('/projects');
            toast.success("Projeto criado com sucesso, espere a aprovação de um administrador");
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Error ao criar o projeto");
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

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '2rem'
        }}
        >
            <Typography variant='h3' sx={{
                fontSize: '26px',
                color: '#22703E',
                fontWeight: '700',
            }}>
                Criar Projeto
            </Typography>

            <Grid2 container spacing={2}>
                {/* <Grid2 size={4} sx={{
                    padding: '80px',
                    marginLeft: '80px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '50px',
                        backgroundColor: '#E7E7E7',
                        objectFit: 'cover',
                        width: '100%',
                        position: 'relative',
                        padding: '150px',
                        boxSizing: 'border-box',
                    }}>
                        {image ? (
                            <img
                                src={image}
                                alt="Uploaded"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50px',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                }}
                            />
                        ) : (
                            <IconButton sx={{ position: 'absolute', zIndex: 1 }}>
                                <PhotoCamera sx={{ fontSize: 50, color: 'black' }} />
                            </IconButton>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                                zIndex: 0,
                            }}
                        />

                    </Box>
                </Grid2> */}

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
                        onSubmit={handleSubmit(handleCreateProject)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <TextField
                                type="file"
                                onChange={handleFileChange}
                                {...register('file')}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant='h6'
                                component='label'
                                htmlFor="projectName"
                                sx={{
                                    fontSize: '16px',
                                    color: 'black',
                                    fontWeight: '700',
                                    marginBottom: '0.55rem',
                                    padding: '0px ',
                                }}>
                                Nome do Projeto
                            </Typography>

                            <TextField
                                {...register("projectName")}
                                error={!!errors.projectName}
                                helperText={errors?.projectName?.message}
                                fullWidth
                                id="projectName"
                                required
                                variant="outlined"
                                placeholder='Nome do seu projeto'
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant='h6'
                                component='label'
                                htmlFor="description"
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '0.5rem',
                                    color: 'black',
                                    padding: '0',
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

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography
                                variant='h6'
                                component='label'
                                htmlFor="category"
                                sx={{
                                    fontSize: '16px',
                                    marginBottom: '0.5rem',
                                    color: 'black',
                                    padding: '0',
                                    fontWeight: '700',
                                }}>
                                Categorias
                            </Typography>


                        </Box>

                        <Button
                            type="submit"
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '300px',
                                borderRadius: '10px',
                            }}
                        >
                            Salvar Mudanças
                        </Button>
                    </Box>
                </Grid2>

            </Grid2>
        </Box >
    )
}
