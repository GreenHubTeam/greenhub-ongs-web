import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/authContext";
import { PostCard } from '../../components/postcard';
import { CardPost } from '../../components/cardpost';
import { Box, Typography, Grid2, Container, Pagination } from '@mui/material';

const PAGE_SIZE = 6;

export function PostPage() {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);  // Inicializando com 0
    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPost = async () => {
        if (!user?.Ong?.id) return;  // Verificando se a ong está disponível

        setIsLoading(true);
        try {
            const response = await api.get(`/post`, {
                params: {
                    page: page,
                    pageSize: PAGE_SIZE,
                },
            });
            setPostData(response.data.posts);
            setCount(response.data.count || 0);  // Garantir que count tenha valor válido
        } catch (error) {
            console.error(error);
            toast.error("Erro ao buscar os posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.Ong?.id) {
            fetchPost();
        }
    }, [user?.Ong?.id, page]);  // Agora a função depende tanto de user.Ong.id quanto da página

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
            }}>
                <Typography variant='h5' sx={{ margin: '1.5rem', fontWeight: 700 }}>
                    Para você
                </Typography>
            </Box>

            <Container maxWidth='md'>
                <PostCard fetchPost={fetchPost} />

                {!isLoading && Array.isArray(postData) && postData.length > 0 && (
                    <Grid2 container spacing={2} sx={{ marginTop: '3rem' }} >
                        {postData.map((post, index) => (
                            <Grid2 key={index} size={12}>
                                <CardPost
                                    profilePath={post.Ong.imagePath}
                                    description={post.description}
                                    postImagePath={post.imagePath}
                                    createdAt={post.createdAt}
                                    OngName={post.Ong.name}
                                    id={post.id}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                )}

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Typography>Carregando...</Typography>
                    </Box>
                )}
            </Container>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                }}
            >
                <Pagination
                    count={Math.ceil(count / PAGE_SIZE)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#22703E",
                            borderRadius: "50%",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#22703E",
                            color: "#fff",
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "#d3e7d3",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
