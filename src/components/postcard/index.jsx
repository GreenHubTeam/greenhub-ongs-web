import { z } from "zod";
import { env } from '../../env';
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { CloudUpload } from "@mui/icons-material";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, InputAdornment, CircularProgress, Grid2, Card, CardMedia } from '@mui/material';

const postFormSchema = z.object({
    description: z.string().min(1, "É obrigatório escrever algo para postar"),
    file: z
        .instanceof(FileList)
        .refine((files) => files?.length > 0, "Arquivo é obrigatório")
        .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "O arquivo deve ter no máximo 5MB")
        .refine(
            (files) => ["image/jpg", "image/png", "image/jpeg"].includes(files[0]?.type),
            "Formato de arquivo inválido. Apenas JPG, PNG ou JPEG são permitidos."
        )
});

export function PostCard({ fetchPost, imagePath}) {
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(postFormSchema),
    });

    const { user } = useAuth();


    async function handleCreatePost(data) {
        setLoading(true);
        console.log(data);
        const formData = new FormData();
        formData.append("description", data.description);

        if (data.file) {
            formData.append('post-image',data.file[0]);
        }
        try {
            await api.post(`/post/${user.Ong.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await fetchPost()
            toast.success("Post criado com sucesso");
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar post");
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
        <Box>
            <Box
                component='form'
                onSubmit={handleSubmit(handleCreatePost)}
                sx={{
                    padding: '2rem',
                    margin: '4.5rem',
                    display: 'flex',
                    gap: '1.5rem',
                    flexDirection: 'column',
                    height: 'auto',
                    width: '95%',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    border: '1px solid #c7c7c7',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start', 
                        gap: '1rem', 
                        margin: '0 2rem',
                    }}
                >
                    
                    <Box>
                        <img
                            src='/literalmente eu.png'
                            alt="Foto de perfil"
                            style={{ width: '75px', height: '75px', borderRadius: '50%' }}
                        />
                    </Box>

                   
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', 
                            flexGrow: 1,
                            gap: '1rem', 
                        }}
                    >
                        {imagePreview && (
                            <Grid2 size={12}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        boxShadow: 'none', 
                                        border: 'none', 
                                        padding: 0,
                                        margin: 0,
                                    }}
                                >
                                    <CardMedia
                                         image={`${env.api_url}/${imagePath}`}
                                        sx={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            backgroundSize: 'contain', 
                                            border: 'none',
                                        }}
                                    />
                                </Card>
                            </Grid2>
                        )}

                        <TextField
                            fullWidth
                            {...register('description')}
                            variant="standard"
                            slotProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            display: 'flex',
                                            gap: '0.5rem'
                                        }}
                                    >
                                    </InputAdornment>
                                ),
                            }}
                            label='Escreva seu post'
                            multiline
                            rows={4}
                            InputLabelProps={{
                                sx: {
                                    fontSize: '1.2rem',
                                },
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    border: 'none',
                                    padding: '0.5rem',
                                },
                            }}
                        />
                    </Box>
                </Box>




                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1rem'
                    }}
                >
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        sx={{
                            backgroundColor: '#22703E',
                            borderRadius: '8px',
                        }}
                    >
                        Imagem
                        <Box
                            component='input'
                            type="file"
                            {...register('file')}
                            onInput={handleFileChange}
                            multiple
                            sx={{
                                backgroundColor: '#22703E',
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
                        disabled={loading}
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '150px',
                            backgroundColor: '#22703E',
                            height: '2.5rem',
                            borderRadius: '8px',
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Postar"}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
