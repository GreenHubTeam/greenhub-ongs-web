import { PhotoCamera } from '@mui/icons-material';
import { Box, Grid2, TextField, Typography, Button, IconButton } from '@mui/material';

export function Criacaopost() {
    return (
        // TÍTULO
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        }}>
            <Typography variant='h3' sx={{
                padding: '40px',
                fontSize: '26px',
                color: '#22703E',
                fontWeight: '700',
            }}>
                Criar
            </Typography>

            {/* CONTAINER PRINCIPAL */}
            <Grid2 container spacing={3}>
                {/* IMAGEM */}
                <Grid2 item xs={12} md={4}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '50px',
                        backgroundColor: '#E7E7E7',
                        objectFit: 'cover',
                        width: '100%',
                        position: 'relative',
                        padding: '150px',
                        boxSizing: 'border-box',
                        marginLeft:'40px',
                    }}>
                        {/* ÍCONE DE CÂMERA */}
                        <IconButton sx={{ position: 'absolute' }}>
                            <PhotoCamera sx={{ fontSize: 50, color: 'black' }} />
                        </IconButton>
                    
                    </Box>
                </Grid2>

                {/* FORMULÁRIO */}
                <Grid2 item xs={12} md={8}>
                    <Box sx={{ padding: '0 80px' }}>
                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            color: 'black',
                            fontWeight: '700',
                            marginBottom: '0.55rem',
                            padding: '0px ',
                        }}>
                            Nome do Projeto
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            placeholder='Nome do seu projeto'
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                        />

                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
                            padding: '0',
                            fontWeight: '700',
                        }}>
                            Descrição do projeto
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            multiline
                            placeholder='Uma breve descrição do seu projeto...'
                            rows={6}
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginBottom: '1.5rem',
                                borderRadius: '8px',
                            }}
                        />

                        <Typography variant='h6' sx={{
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            color: 'black',
                            padding: '0',
                            fontWeight: '700',
                        }}>
                            Categorias
                        </Typography>

                        <TextField
                            required
                            placeholder='Selecione uma categoria'
                            sx={{
                                backgroundColor: '#E7E7E7',
                                marginLeft: '0,5rem', 
                                borderRadius: '8px',
                            }}
                        />

                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '300px',
                                borderRadius: '10px',
                                marginLeft:'30px',
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
