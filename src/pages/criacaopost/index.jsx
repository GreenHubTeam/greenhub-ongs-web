import { z } from "zod";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhotoCamera } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid2, TextField, Typography, Button, IconButton } from '@mui/material';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const postFormSchema = z.object({
    projectName: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    category: z.string().min(1, "Categoria é obrigatória"),
});

export function Criacaopost() {
    const [image, setImage] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postFormSchema),
    });

    async function handleRegister(data) {
        try {
            console.log(data);
        } catch (error) {
            console.error("Erro ao criar post", error);
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
        }}
        >

            <Typography variant='h3' sx={{
                padding: '40px',
                fontSize: '26px',
                color: '#22703E',
                fontWeight: '700',
            }}>
                Criar
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={4} sx={{
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
                </Grid2>

                <Grid2 size={6}>
                    <Box component='form' onSubmit={handleSubmit(handleRegister)} sx={{ padding: '0 80px' }}>
                        <Typography variant='h6' sx={{
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
                            required
                            placeholder='Nome do seu projeto'
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                        />

                        <Typography variant='h6' sx={{
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
                            placeholder='Uma breve descrição do seu projeto...'
                            rows={6}
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                        />

                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
                            padding: '0',
                            fontWeight: '700',
                        }}>
                            Categorias
                        </Typography>

                        <TextField
                            {...register("category")}
                            error={!!errors.category}
                            helperText={errors?.category?.message}
                            required
                            placeholder='Selecione uma categoria'
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginLeft: '0,5rem',
                                borderRadius: '8px'
                            }}
                        />

                        <Button
                            type="submit"
                            onClick={handleSubmit(handleRegister)}
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '300px',
                                borderRadius: '10px',
                                marginLeft: '30px'
                            }}
                        >
                            Salvar Mudanças
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}
