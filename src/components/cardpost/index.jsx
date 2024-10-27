import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { env } from '../../env';
import { useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export function CardPost({ description, OngName, profilePath, createdAt, postImagePath, id }) {
    const [profileSrc, setProfileSrc] = useState(profilePath ? `${env.api_url}/${profilePath}` : "/nomelogo.png");
    const [postSrc, setPostSrc] = useState(postImagePath ? `${env.api_url}/${postImagePath}` : "/nomelogo.png");
    
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
                            src={profileSrc}
                            alt="Foto de perfil"
                            onError={() => {
                                setProfileSrc("/nomelogo.png");
                            }}
                            sx={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }}
                        />

                        <Typography variant='h6'>
                            {OngName}
                        </Typography>

                        <Typography variant="body2">
                            Publicado {dayjs(createdAt).fromNow()}
                        </Typography>
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
                            sx={{}}
                        />
                    )}

                </Box>
            </CardContent>
        </Card>
    )
}