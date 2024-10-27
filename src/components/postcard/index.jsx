import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAuth } from "../../context/authContext";
import { CloudUpload } from "@mui/icons-material";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, InputAdornment, CircularProgress, Grid2, Card, CardMedia, CardContent } from '@mui/material';

const postFormSchema = z.object({
    description: z.string().min(1, "É obrigatório escrever algo para postar"),
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

export function PostCard({ fetchPost }) {
    const [profileImage, setProfileImage] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [, setFile] = useState(null);

    const randomizeProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
        ];

        const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        setProfileImage(randomImage);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(postFormSchema),
    });

    const { user } = useAuth();

    async function handleCreatePost(data) {
        setLoading(true);

        const formData = new FormData();
        formData.append("description", data.description);

        if (data.file) {
            formData.append('post-image', data.file[0]);
        }

        try {
            await api.post(`/post/${user.Ong.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await fetchPost()
            toast.success("Post criado com sucesso");
            reset();
            setImagePreview(null);
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar post");
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

    useEffect(() => {
        randomizeProfileImage();
    }, []); 

    return (
        <Card>
            <CardContent>
                <Box
                    component='form'
                    onSubmit={handleSubmit(handleCreatePost)}
                    sx={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                        }}
                    >

                        <Box
                            component='img'
                            src={profileImage}
                            alt="Foto de perfil"
                            sx={{ width: '35px', height: '35px', borderRadius: '50%' }}
                        />


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
                                            image={imagePreview}
                                            sx={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                border: 'none',
                                            }}
                                        />
                                    </Card>
                                </Grid2>
                            )}

                            <TextField
                                fullWidth
                                {...register('description')}
                                error={!!errors.description && errors.description}
                                variant="filled"
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
                                rows={2}
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
            </CardContent>
        </Card >
    )
}
