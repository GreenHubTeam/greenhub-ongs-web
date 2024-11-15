import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { env } from '../../env';
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { Delete } from "@mui/icons-material";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Card, CardContent, Typography, Button, Avatar, Stack, useMediaQuery, CardMedia } from '@mui/material';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export function CardPost({ description, OngName, profilePath, createdAt, postImagePath, id, fetchPost, showDeleteButton }) {
    const [deleting, setDeleting] = useState(false);
    const [profileSrc] = useState(profilePath ? `${env.api_url}/${profilePath}` : "/nomelogo.png");
    const [postSrc, setPostSrc] = useState(postImagePath ? `${env.api_url}/${postImagePath}` : "/nomelogo.png");
    const [profileImage, setProfileImage] = useState(profileSrc);

    const randomizeProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
        ];
        const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        return randomImage;
    };

    const isMobile = useMediaQuery('(max-width:768px)');

    async function handleDeletePost(id) {
        setDeleting(true);
        try {
            await api.delete(`/post/${id}`);
            toast.success("Post deletado com sucesso");
            fetchPost()
        } catch {
            toast.error("Erro ao deletar o post");
        } finally {
            setDeleting(false);
        }
    }

    useEffect(() => {
        if (!profilePath) {
            setProfileImage(randomizeProfileImage());
        }
    }, [profilePath]);

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: '.5rem', md: '2rem' }
                        }}
                    >
                        <Avatar
                            src={profileImage}
                            alt="Foto de perfil"
                            onError={() => {
                                setProfileImage("/nomelogo.png");
                            }}
                            sx={{
                                width: 'auto',
                                height: { xs: '2rem', md: '65px' },
                            }}
                        />

                        <Stack>
                            <Typography variant='h6' noWrap>
                                {OngName}
                            </Typography>
                            <Typography variant="body2" noWrap>
                                Publicado {dayjs(createdAt).fromNow()}
                            </Typography>
                        </Stack>

                        {showDeleteButton && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<Delete />}
                                    sx={{
                                        width: { xs: 'auto', sm: '150px' },
                                    }}
                                    onClick={() => handleDeletePost(id)}
                                    disabled={deleting}
                                >
                                    {isMobile ? "" : "Excluir"}
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Typography>
                        {description}
                    </Typography>
                </Box>
            </CardContent>

            {postImagePath && (
                <CardMedia
                    component='img'
                    alt='Project Image'
                    sx={{ height: 200 }}
                    image={postSrc}
                    title='Project Image'
                    onError={() => {
                        setPostSrc("/nomelogo.png");
                    }}
                />
            )}
        </Card>
    );
}
