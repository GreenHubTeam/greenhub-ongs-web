import { Box, Grid2, TextField, InputAdornment, Typography, Button } from '@mui/material';
import { CardContained } from '../../components/cardcontained';

export function EditarPost() {
    return (
        <Box sx={{
            display: 'flex',
            gap: '4rem',
            flexDirection: 'column',
        }}>
            <Typography variant='h3' sx={{
                padding: '16px 48px ',
                marginTop: '20px',
                fontSize: '26px',
                color: '#22703E',
            }}>
                Editar
            </Typography>

            <Box sx={{padding: '0 90px'}}>
                <Box sx={{
                    display: 'flex',
                    gap: '1.5rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    backgroundColor: '#E7E7E7',
                }}
                >

                </Box>
            </Box>
            <Grid2>

                <Grid2>
                    <Box>
                        <Typography variant='h6' sx={{
                            fonSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
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