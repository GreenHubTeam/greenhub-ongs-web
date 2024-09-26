import { Box, Grid2, InputAdornment, TextField, Typography, Divider } from "@mui/material";

export function PerfilPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                fullwidth
                component='img'
                src='/fundoperfil.png'
                alt='imagem de fundo do perfil'
                sx={{
                    height: '280px',
                    margin: '0',
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '-90px'
                }}>
                <Box
                    component='img'
                    src='perfilong.png'
                    alt='Foto de perfil da ONG'
                    sx={{
                        height: '150px',
                    }}
                />

                <Typography
                    variant='h3'
                >
                    Guardiões da Amazônia
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