import { env } from "../../env";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, useMediaQuery } from '@mui/material';
import { useAuth } from "../../context/authContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Grid2, Typography, CircularProgress, CardMedia, Card, Avatar } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";

export function VisualizarProjetos() {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const navigate = useNavigate();

    const getRandomProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
            "/profile6.png"
        ];
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
    };

    // eslint-disable-next-line react/prop-types
    const CustomAvatar = ({ imagePath, name }) => {
        const [avatarSrc, setAvatarSrc] = useState(`${env.api_url}/${imagePath}`);

        return (
            <Avatar
                src={avatarSrc}
                alt={name}
                onError={() => setAvatarSrc(getRandomProfileImage())}
                sx={{ cursor: 'pointer' }}
            />
        );
    };


    useEffect(() => {
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
                const project = await api.get(`/project/one/${id}`);
                setProject(project.data);
                setImagePreview(`${env.api_url}/${project.data.imagePath}`);
            } catch {
                toast.error("Erro ao buscar os dados do projeto");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
        fetchFeedback();
    }, [id]);

    return (
        <>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/projects')} color='inherit' variant='outlined'>
                Voltar
            </Button>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}>

                <Typography
                    sx={{
                        marginBottom: '20px',
                        fontWeight: '700',
                        fontSize: '26px',
                    }}
                >
                    {project?.name}
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

                {!loading && (
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
                                        sx={{ height: "100%", maxWidth: isMobile ? '100%' : '600px' }}
                                        component='img'
                                        alt="FOTO DO PROJETO"
                                        onError={() => setImagePreview('/nomelogo.png')}
                                    />
                                </Card>
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Typography
                                    sx={{
                                        color: '#22703E',
                                        marginTop: isMobile ? '10px' : '20px',
                                        fontWeight: '700',
                                        fontSize: isMobile ? '20px' : '26px',
                                    }}
                                >
                                    Sobre o projeto
                                </Typography>

                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                        fontWeight: '700',
                                        marginTop: '20px',
                                        alignItems: 'flex-start',
                                        overflow: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        dangerouslySetInnerHTML={{ __html: project?.description }}
                                    />
                                </Box>
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <Typography
                                    sx={{
                                        color: '#22703E',
                                        marginTop: '44px',
                                        fontWeight: '700',
                                        fontSize: isMobile ? '20px' : '22px',
                                    }}
                                >
                                    Publicado por
                                </Typography>

                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                        marginTop: '20px',
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: { xs: 'start', md: 'center' },
                                        flexDirection: isMobile ? 'column' : 'row',
                                    }}
                                >
                                    <CustomAvatar imagePath={user.imagePath} name={user.name} />
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        {user.name}
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: '#22703E',
                                        fontWeight: '700',
                                        fontSize: isMobile ? '20px' : '26px',
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <CustomAvatar imagePath={feedback.user.imagePath} name={feedback.user.name} />
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
        </>
    );
}