import { Box, Grid2, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function PostPage() {
    const navigate = useNavigate();

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
                                A EcoFuturo é uma ONG dedicada à preservação do meio ambiente e à conscientização sobre a importância do reflorestamento. Focada em educar comunidades sobre o impacto das mudanças climáticas, promove campanhas de plantio de arvóres e redução de resíduo. 
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
                                src='/amoranimal.png'
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
                                }}>Amor animal</Typography>

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
                                Amor animal é uma ONG voltada para o resgate, tratamento e adoção de animais abandonados. Além de oferecer abrigos temporários, promove campanhas de coscientização contra maus-tratos e busca incentivar a adoção responsável.
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
                                src='/saude.png'
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
                                }}>Saude para todos</Typography>

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
                                A ONG Saúde para todos trabalha para melhorar o acesso a serviçõs de saúde em regiões remotas e carentes. Seu foco é ofereeecer cuidados médicos básicos, treinamento para melhorar o acesso a serviçõs de saúde em regiões remotas e carentes. Seu foco é oferecer cuidados médicos básicos, treinamento profissionais de saúde locais e promover campanhas de prevenção de doenças.
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
                                src='/cidadania.png'
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
                                }}>Cidadania viva</Typography>

                                <Chip
                                    label='Reprovado'
                                    variant='filled'
                                    color='error'

                                />

                            </Box>

                            <Typography sx={{
                                padding: '20px 15px',
                                fontSize: '16px',
                            }}>
                                A ONG cidadania viva atua em garantir direitos básicos a comunidades carentes, comm ênfase em educaçaõ, saúde e assistência social. Suas ações incluem programas de alfabetização, campanhas de vacinação e suporte a famílias em situação de vulnerabilidade.
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
                </Grid2>
            </Grid2>
        </Box>
    )
}