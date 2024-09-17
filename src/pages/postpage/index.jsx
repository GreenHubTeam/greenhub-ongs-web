import { Box, Grid2, Typography, Button, Chip } from '@mui/material';

export function PostPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
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
                        padding: '40px',
                        display: 'flex',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <img src='/ecofuturo.png' alt='Logo da EcoFuturo' style={{
                                width: '250px',
                                height: '250px',
                            }} />
                        </Box>

                        <Grid2 sx={{
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography sx={{
                                    padding: '0 15px',
                                    fontSize: '28px',
                                }}>EcoFuturo</Typography>

                                <Chip label='Aprovado'
                                    variant='outlined'
                                    color='success'
                                    sx={{

                                    }} />

                            </Box>
                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dolore
                                aperiam sint assumenda magni excepturi, provident ratione praesentium reiciendis
                                atque dolorum consequatur tempora, error quidem ea quos tenetur ipsa. Rem!
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#22703E',
                                        height: '3rem',
                                        width: '200px',
                                        marginLeft: '150px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Grid2>
                    </Box>
                </Grid2>

                <Grid2 size={6}>
                    <Box sx={{
                        padding: '40px',
                        display: 'flex',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <img src='/ecofuturo.png' alt='Logo da EcoFuturo' style={{
                                width: '250px',
                                height: '250px',
                            }} />
                        </Box>

                        <Grid2 sx={{
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography sx={{
                                    padding: '0 15px',
                                    fontSize: '28px',
                                }}>EcoFuturo</Typography>

                                <Chip label='Aprovado'
                                    variant='outlined'
                                    color='success'
                                    sx={{

                                    }} />

                            </Box>
                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dolore
                                aperiam sint assumenda magni excepturi, provident ratione praesentium reiciendis
                                atque dolorum consequatur tempora, error quidem ea quos tenetur ipsa. Rem!
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#22703E',
                                        height: '3rem',
                                        width: '200px',
                                        marginLeft: '150px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Grid2>
                    </Box>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Box sx={{
                        padding: '40px',
                        display: 'flex',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <img src='/ecofuturo.png' alt='Logo da EcoFuturo' style={{
                                width: '250px',
                                height: '250px',
                            }} />
                        </Box>

                        <Grid2 sx={{
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography sx={{
                                    padding: '0 15px',
                                    fontSize: '28px',
                                }}>EcoFuturo</Typography>

                                <Chip label='Aprovado'
                                    variant='outlined'
                                    color='success'
                                    sx={{

                                    }} />

                            </Box>
                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dolore
                                aperiam sint assumenda magni excepturi, provident ratione praesentium reiciendis
                                atque dolorum consequatur tempora, error quidem ea quos tenetur ipsa. Rem!
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#22703E',
                                        height: '3rem',
                                        width: '200px',
                                        marginLeft: '150px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Grid2>
                    </Box>
                </Grid2>

                <Grid2 size={6}>
                    <Box sx={{
                        padding: '40px',
                        display: 'flex',
                        gap: '1.5rem',
                        marginTop: '3rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '550px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                    }}>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <img src='/ecofuturo.png' alt='Logo da EcoFuturo' style={{
                                width: '250px',
                                height: '250px',
                            }} />
                        </Box>

                        <Grid2 sx={{
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <Typography sx={{
                                    padding: '0 15px',
                                    fontSize: '28px',
                                }}>EcoFuturo</Typography>

                                <Chip label='Aprovado'
                                    variant='outlined'
                                    color='success'
                                    sx={{

                                    }} />

                            </Box>
                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dolore
                                aperiam sint assumenda magni excepturi, provident ratione praesentium reiciendis
                                atque dolorum consequatur tempora, error quidem ea quos tenetur ipsa. Rem!
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#22703E',
                                        height: '3rem',
                                        width: '200px',
                                        marginLeft: '150px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    Editar
                                </Button>
                            </Box>
                        </Grid2>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}