import { Box, Paper, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
export function CardContained({ title, description, img }) {
    return (
        <Paper
            sx={{
                marginBottom: '25px',
                borderRadius: '8px',
                color: '#22703E',
                padding: '2rem'
            }}
            variant='outlined' >

            {img && (
                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    mb: '1rem',
                }}>
                    <img
                        src={img}
                        alt={title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px'
                        }}
                    />
                </Box>
            )}

            <Typography
                fontWeight='500'
                sx={{
                    fontSize: {
                        xs: '1.5rem',
                        md: '2rem'
                    }
                }}
            >
                {title}
            </Typography>
            <Typography>{description}</Typography>
        </Paper >
    )
}