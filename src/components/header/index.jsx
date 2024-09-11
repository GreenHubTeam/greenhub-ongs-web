import { Box, Typography } from '@mui/material';

export function Header() {
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
            <Typography sx={{ fontSize: '1.5rem' }}>
                <span style={{ color: '#22703E' }}>Gre</span>
                <span style={{ color: '#3A914D' }}>en</span>
                <span style={{ color: '#3A914D' }}>Hub</span>
            </Typography>
        </Box>
    );
}