import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { PostCard } from '../../components/postcard';
import { CardPost } from '../../components/cardpost';
import { Box, Typography, Grid2 } from '@mui/material';

export function PostPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState([]);


    const { user } = useAuth();

    async function fetchPost() {
        setIsLoading(true);
        try {
            const response = await api.get(`/post`);
            setPostData(response.data);
        } catch (error) {
            console.log(error)
            toast.error("Error ao buscar os post")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [user.Ong.id]);


    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
            }}>
                <Typography variant='h5' sx={{ margin: '1.5rem', fontWeight: 700 }}>Para você</Typography>

            </Box>

            <Box>
                <PostCard fetchPost={fetchPost} />

                <>
                    {!isLoading && postData.length > 0 && (
                        <Grid2 container spacing={2} direction="column" justifyContent="center"alignItems="center">
                            {
                                postData.map(
                                    (post, index) => (
                                        <Grid2 key={index} size={6}>
                                            <CardPost
                                                description={post.description}
                                                profilePath={post.imagePath}
                                                createdAt={post.createdAt}
                                                OngName={post.Ong.name}
                                                postImagePath={post.Ong.imagePath}
                                            />
                                        </Grid2>
                                    )
                                )
                            }
                        </Grid2>
                    )}
                </>
            </Box>
        </Box>
    )
}