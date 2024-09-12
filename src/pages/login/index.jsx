import { Box, Divider, InputAdornment, TextField, Button, Paper, Typography, Link, Grid2, } from "@mui/material";
import { Header } from "../../components/header";
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';




export function LoginPage() {
    return (
        <Box sx={{ display: "flex", minHeight: '100vh' }}>


            <Box sx={{ width: '500px', overflowY: 'auto' }}>
                <Box
                    sx={{
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4rem',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}>
                       
                    <Box>

                       <Header/>
                       
                        <Typography
                            variant="h4"
                            sx={{ marginLeft: '2rem', fontWeight: 700 }}
                        >
                            Acesse sua conta
                        </Typography>

                        <Box
                            sx={{
                                marginTop: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem',
                                padding: '2rem',
                            }}
                        >

                            <TextField
                                fullWidth
                                required
                                type='email'
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
                                                <PersonIcon />

                                                <Divider orientation="vertical" flexItem />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                label="E-mail"
                            />

                            <TextField
                                fullWidth
                                required
                                type='password'
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
                                                <KeyIcon />

                                                <Divider orientation="vertical" flexItem />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                label="Senha"
                            />

                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: '#22703E',
                                    height: '3.5rem',
                                    width: '50%',
                                    margin: '0 auto',
                                }}
                            >
                                Confirmar
                            </Button>

                        </Box>
                       <Box sx={{
                            marginTop: '5rem',
                            marginRight: '1rem',
                       }}>
                       <Link 
                                href="#"
                                sx={{
                                    color: '#22703E',
                                    cursor: 'pointer',
                                }}
                            >
                                Termos de Uso
                            </Link>

                            <Link 
                                href="#"
                                sx={{
                                    color: '#22703E',
                                    cursor: 'pointer',
                                    marginLeft: '2rem',
                                }}
                            >
                                LGPD
                            </Link>
                       </Box>
                    </Box>

                </Box>
            </Box>

            <Box
                component='img'
                src='/paraguaio.png'
                alt='Imagem de floresta'
                sx={{
                    objectFit: 'hover',
                    flex: '1',
                }}
            >

            </Box>

        </Box>

    )
}