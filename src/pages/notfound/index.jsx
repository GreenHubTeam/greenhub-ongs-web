import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Box
                    component='img'
                    src='/notfound.png'
                    alt="Logo da greenHub"
                    width={300}
                    height={300}
                />
                <Typography variant="h2" sx={{ fontWeight: 600 }}>
                    Error - 404
                </Typography>
                <Typography variant="h5">
                    Pagina não encontrada
                </Typography>

                <Button
                    LinkComponent={Link}
                    to="/"
                    variant="contained"
                    sx={{ backgroundColor: 'green', boxShadow: 'none', height: '3.5rem', borderRadius: '.7rem' }}
                >
                    Voltar ao inicio
                </Button>
            </Box>

        </Box>
    )
}