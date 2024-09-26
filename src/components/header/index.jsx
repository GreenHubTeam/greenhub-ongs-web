import { Box, Typography } from '@mui/material';

export function HeaderComponent() {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: 0,
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '1rem',
                fontFamily: 'Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
        >
            <Box
                component='img'
                src='/logogreenhub.png'
                alt='Logo do Greenhub'
                sx={{
                    width: 80,
                    height: 80
                }}
            />
            <Box sx={{ display: 'flex' }}>
                <Typography style={{ color: '#22703E', fontSize: '1.5rem', fontWeight: 700 }}>Gre</Typography>
                <Typography style={{ color: '#3A914D', fontSize: '1.5rem', fontWeight: 700 }}>en</Typography>
                <Typography style={{ color: '#3A914D', fontSize: '1.5rem', fontWeight: 700 }}>Hub</Typography>
            </Box>
        </Box>
    );
}