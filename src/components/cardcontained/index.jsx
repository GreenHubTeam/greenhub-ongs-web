import { Paper, Typography } from '@mui/material';

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
                variant='h3'
                fontWeight='500'
            >{title}</Typography>
            <Typography>{description}</Typography>
        </Paper >
    )
}