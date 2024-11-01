import { z } from "zod";
import { env } from "../../env";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Grid2, Typography, CircularProgress, CardMedia, Card, Avatar } from '@mui/material';

const postFormSchema = z.object({
    user: z.string().min(1, "Nome do projeto é obrigatório"),
    name: z.string().min(1, "Nome do projeto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    categoryProjectId: z.string().min(1, "Categoria é obrigatória"),
});

export function VisualizarProjetos() {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [profileImage, setProfileImage] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

    const {
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            categoryProjectId: ''
        }
    });

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

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/user/${user.id}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
        }
    };

    async function fetchFeedback() {
        setIsLoadingFeedback(true);
        try {
            const response = await api.get(`/feedback/${id}`);
            setFeedbacks(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao buscar os feedbacks");
        } finally {
            setIsLoadingFeedback(false);
        }
    }

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const projects = await api.get(`/project/one/${id}`);
            console.log("Dados do projeto:", projects.data);

            setProject(projects.data);

            const categorys = await api.get('/category');
            setCategory(categorys.data);

            if (projects.data.userId) {
                await fetchUser(projects.data.userId);
            }

            reset({
                user: projects.data.user || '',
                name: projects.data.name || '',
                description: projects.data.description || '',
                categoryProjectId: String(projects.data.categoryProjectId)
            });

            setImagePreview(`${env.api_url}/${projects.data.imagePath}`);
        } catch {
            toast.error("Erro ao buscar os dados do projeto");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProjects();
        fetchFeedback();
        randomizeProfileImage();
    }, [id, reset]);

    const { name, description } = getValues();


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
        }}>

            <Typography
                sx={{
                    marginBottom: '20px',
                    fontWeight: '700',
                    fontSize: '26px',
                }}
            >
                {name}
            </Typography>

            {loading && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                }}>
                    <CircularProgress color="success" />
                </Box>
            )}

            {!loading && category && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        width: '100%',
                    }}
                >
                    <Grid2 container spacing={4}>
                        <Grid2 size={12}>
                            <Card variant="outlined" sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CardMedia
                                    image={imagePreview}
                                    sx={{ height: "100%", maxWidth: '600px' }}
                                    component='img'
                                    alt="FOTO DO PROJETO"
                                    onError={() => setImagePreview('/nomelogo.png')}
                                />
                            </Card>
                        </Grid2>

                        <Grid2 size={6}>
                            <Typography
                                sx={{
                                    color: '#22703E',
                                    marginTop: '20px',
                                    fontWeight: '700',
                                    fontSize: '26px',
                                }}
                            >
                                Sobre o projeto
                            </Typography>

                            <Box
                                sx={{
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '26px',
                                    marginTop: '20px',
                                    alignItems: 'flex-start', // Para alinhar o texto à esquerda
                                    overflow: 'visible',
                                }}
                            >
                                <Typography sx={{ fontWeight: '700', wordBreak: 'break-word', overflowWrap: 'break-word', }}>
                                    {description}
                                </Typography>
                            </Box>
                        </Grid2>

                        <Grid2 size={6}>
                            <Typography
                                sx={{
                                    color: '#22703E',
                                    marginTop: '44px',
                                    fontWeight: '700',
                                    fontSize: '22px',
                                }}
                            >
                                Publicado por
                            </Typography>

                            <Box
                                sx={{
                                    borderRadius: '10px',
                                    marginTop: '20px',
                                    display: 'flex',
                                }}
                            >
                                <Avatar
                                    src={profileImage}
                                    alt='Foto de perfil'
                                    sx={{
                                        width: '35px',
                                        height: '35px',
                                        marginRight: '0.75rem',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                />
                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    {user.name}
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    color: '#22703E',
                                    fontWeight: '700',
                                    fontSize: '26px',
                                    marginTop: '50px',
                                    marginBottom: '10px',
                                }}
                            >
                                Feedbacks do projeto
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <FavoriteIcon sx={{ color: 'red', marginRight: '0.5rem' }} />

                                <Typography sx={{ color: '#22703E', fontWeight: '700', }}>
                                    {project ? project._count.like : 0}
                                </Typography>
                            </Box>

                            {isLoadingFeedback ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                                    <CircularProgress />
                                </Box>
                            ) : feedbacks.length > 0 ? (
                                <Box sx={{ marginTop: '20px' }}>
                                    {feedbacks.map((feedback) => (
                                        <Box key={feedback.id} sx={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    src={profileImage}
                                                    alt='Foto de perfil'
                                                    sx={{
                                                        width: '40px',
                                                        height: '40px',
                                                        marginRight: '0.75rem',
                                                    }}
                                                />
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                                    {feedback.user.name}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                                                {feedback.message}
                                            </Typography>
                                            <Typography variant="caption" sx={{ marginTop: '0.5rem', display: 'block' }}>
                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                                    Nenhum feedback encontrado.
                                </Typography>
                            )}
                        </Grid2>
                    </Grid2>
                </Box>
            )}
        </Box>
    );
}