import { Box, Grid2, Typography, Button, Chip } from '@mui/material';

export function PostPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem'
        }}>
            <Typography variant='h3' sx={{
                color: '#22703E',
                padding: '16px 48px ',
                marginTop: '20px',
            }}>
                Projetos
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Box sx={{
                        padding: '2rem',
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box>
                            <Box
                                component='img'
                                src='/ecofuturo.png'
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
                                }}>EcoFuturo</Typography>

                                <Chip
                                    label='Aprovado'
                                    variant='filled'
                                    color='success'

                                />

                            </Box>

                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dignissimos, hic amet odit rerum nihil fugit fuga in aliquid distinctio possimus veniam ab. Esse adipisci distinctio sapiente voluptatem porro ut?
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
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={6}>
                    <Box sx={{
                        padding: '2rem',
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box>
                            <Box
                                component='img'
                                src='/ecofuturo.png'
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
                                }}>EcoFuturo</Typography>

                                <Chip
                                    label='Aprovado'
                                    variant='filled'
                                    color='success'

                                />

                            </Box>

                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dignissimos, hic amet odit rerum nihil fugit fuga in aliquid distinctio possimus veniam ab. Esse adipisci distinctio sapiente voluptatem porro ut?
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
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}