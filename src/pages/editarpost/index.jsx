import { Box, Grid2, TextField, InputAdornment, Typography, Button } from '@mui/material';

export function EditarPost() {
    return (
        <Box sx={{
            display: 'flex',
            gap: '2rem',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Typography variant='h3' sx={{
                padding: '40px',
                fontSize: '26px',
                color: '#22703E',
            }}>
                Editar
            </Typography>

            <Box sx={{ padding: '40px 120px' }}>
                <Box component='img'
                    src='/ecofuturo.png'
                    alt='Logo da EcoFuturo'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px',
                        borderWidth: '2px',
                        borderRadius: '8px',
                        backgroundColor: '#E7E7E7',
                        objectFit: 'cover',
                        width: '100%',
                    }}
                />
            </Box>
            <Grid2>

                <Grid2>

                    <Box sx={{ padding: '0 80px' }}>
                        <Typography variant='h6' sx={{
                            fonSize: '16px',
                            color: 'black',
                            marginBottom: '0.55rem',
                            padding: '0px ',
                        }}>
                            Nome do Projeto
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                                border: '10px',
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}
                                        >

                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Typography variant='h6' sx={{
                            fonSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
                            padding: '0',
                        }}>
                            Descrição do projeto
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={6}
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}
                                        >

                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Typography variant='h6' sx={{
                            fonSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
                            padding: '0',
                        }}>
                            Categorias
                        </Typography>

                        <TextField
                            required
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}
                                        >

                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '300px',
                                marginLeft: '150px',
                                borderRadius: '10px',
                            }}
                        >
                            Salvar Mudanças
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}