import { Box, Grid2, InputAdornment, TextField, Typography, Divider} from "@mui/material";

export function PerfilPage() {
    return (
        <Box>
            <Box
                fullwidthh
                component='img'
                src='/fundoperfil.png'
                alt='imagem de fundo do perfil'
                sx={{
                    height: '280px',
                    width: '100%',
                    margin: '0',
                }}
            />

            <Box sx={{
                display: 'flex',
                margin: '-120px 90px',
                alignItems: 'center',
                gap: '2rem'
            }}>
                <Box
                    component='img' src='perfilong.png'
                    alt='Foto de perfil da ONG'
                    sx={{
                        height: '200px',
                    }}
                />

                <Typography
                    variant='h3'
                    sx={{
                        padding: '0',
                        margin: '0',
                        fontSize: '40px',
                        marginBottom: '50px',
                        marginTop: '50px',
                    }}
                >Guardiões da Amazônia
                </Typography>
            </Box>

            <Grid2 container spacing={2}>
                <Grid2 size={2}>
                    <TextField
                        required
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

                                        <Divider orientation="vertical" flexItem />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                </Grid2>
            </Grid2>
        </Box>
    )
}