import { Box, Button, Typography, Chip, } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function CardProject({ name, description, status, imagePath }) {
    const navigate = useNavigate();

    const getStatusChip = (status) => {
        switch (status) {
            case 'Aprovado':
                return <Chip label='Aprovado' variant='filled' color='success' />;
            case 'Rejeitado':
                return <Chip label='Rejeitado' variant='filled' color='error' />;
            case 'Pendente':
                return <Chip label='Pendente' variant='filled' color='warning' />;
            default:
                return <Chip label='Status desconhecido' variant='filled' color='default' />;
        }
    };

    return (
        <Box sx={{
            gap: '1.5rem',
            padding: '2rem',
            display: 'flex',
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
                    src={imagePath}
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
                    }}>
                        {name}
                    </Typography>

                    {getStatusChip(status)}
                </Box>

                <Typography sx={{
                    padding: '20px 15px',
                    fontSize: '16px',
                }}>
                    {description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#22703E',
                            height: '3rem',
                            borderRadius: '10px',
                            width: '200px'
                        }}
                        onClick={() => navigate('/editar')}
                    >
                        Editar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}