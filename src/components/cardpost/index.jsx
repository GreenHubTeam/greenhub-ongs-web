import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { env } from '../../env';
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { Delete } from "@mui/icons-material";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export function CardPost({ description, OngName, profilePath, createdAt, postImagePath, id , onDelete }) {
    const [deleting, setDeleting] = useState(false);
    const [profileSrc, setProfileSrc] = useState(profilePath ? `${env.api_url}/${profilePath}` : "/nomelogo.png");
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

    async function handleDeletePost() {
        setDeleting(true);
        try {
            await api.delete(`/post/${id}`);

            toast.success("Post deletado com sucesso");
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
                            gap: '2rem'
                        }}
                    >
                        <Box
                            component='img'
                            src={profileImage}
                            alt="Foto de perfil"
                            onError={() => {
                                setProfileImage("/nomelogo.png");
                            }}
                            sx={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }}
                        />

                        <Typography variant='h6'>
                            {OngName}
                        </Typography>

                        <Typography variant="body2">
                            Publicado {dayjs(createdAt).fromNow()}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                            sx={{
                                width: '150px',
                                height: '55px',
                            }}
                            onClick={handleDeletePost}
                        >
                            Excluir post
                        </Button>
                    </Box>

                    </Box>

                    <Typography>
                        {description}
                    </Typography>
                    {postImagePath && (
                        <Box
                            component='img'
                            src={postSrc}
                            onError={() => {
                                setPostSrc("/nomelogo.png");
                            }}
                            alt="Imagem do post"
                            sx={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}

                </Box>
            </CardContent>
        </Card>
    );
}
