import { env } from '../../env';
import { useState } from 'react';
import { Create } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Chip, CardContent, Card, CardMedia, CardActions, Paper, Stack, CardActionArea } from '@mui/material';

// Função para remover tags HTML
const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};

// eslint-disable-next-line react/prop-types
export function CardProject({ name, description, status, imagePath, id }) {
    const navigate = useNavigate();
    const [imagePathSrc, setImagePathSrc] = useState(imagePath ? `${env.api_url}/${imagePath}` : "/nomelogo.png");

    const getStatusChip = (status) => {
        switch (status) {
            case 'APPROVED':
                return <Chip label='Aprovado' variant='filled' color='success' />;
            case 'REPROVED':
                return <Chip label='Rejeitado' variant='filled' color='error' />;
            case 'WAITING':
                return <Chip label='Pendente' variant='filled' color='warning' />;
            default:
                return <Chip label='Status desconhecido' variant='filled' color='default' />;
        }
    };

    return (
        <Paper variant='outlined'>
            <Card elevation={0}>
                <CardActionArea onClick={() => navigate(`/show-project/${id}`)}>
                    <CardMedia
                        component='img'
                        alt='Project Image'
                        sx={{ height: 200 }}
                        image={imagePathSrc}
                        title='Project Image'
                        onError={() => {
                            setImagePathSrc("/nomelogo.png");
                        }}
                    />

                    <CardContent>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '1.35rem',
                                    marginBottom: '.4rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {name}
                            </Typography>

                            {getStatusChip(status)}
                        </Box>

                        {/* Renderizar o texto sem tags HTML */}
                        <Typography
                            noWrap
                        >
                            {stripHtmlTags(description)}
                        </Typography>
                    </CardContent>
                </CardActionArea>


                <CardActions>
                    <Stack width='100%' direction='row' justifyContent='flex-end' spacing={2}>
                        <Button
                            startIcon={<Create />}
                            variant='contained'
                            onClick={() => navigate(`/edit-project/${id}`)}
                            sx={{
                                backgroundColor: 'green',
                                borderRadius: '8px',
                            }}
                            size='medium'
                        >
                            Editar
                        </Button>
                    </Stack>
                </CardActions>
            </Card>
        </Paper>
    );
}