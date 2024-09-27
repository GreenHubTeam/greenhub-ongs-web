import { Box, Button, Typography, Chip, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { env } from '../../env';


// eslint-disable-next-line react/prop-types
export function CardProject({ name, description, status, imagePath, id }) {
    const navigate = useNavigate();

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
        <Box sx={{
            padding: '2rem',
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderWidth: '2px',
            borderRadius: '8px',
            backgroundColor: '#E7E7E7',
        }}>
            <Box>
                <Box
                    component='img'
                    src={imagePath ? `${env.api_url}/${imagePath}` : "/ecofuturo.png"}
                    alt='Logo da EcoFuturo'
                    sx={{
                        height: '250px',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography sx={{
                        padding: '0 15px',
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        {name}
                    </Typography>


                </Box>

                <Typography sx={{
                    padding: '20px 15px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}>
                    {description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#3A914D',
                            height: '3rem',
                            borderRadius: '20px',
                            width: '200px'
                        }}
                        onClick={() => navigate(`/editar/${id}`)}
                    >
                        Editar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}