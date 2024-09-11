import { Paper, Typography } from '@mui/material';

export function CardContained({ title, description }) {
    return (
        <Paper
            sx={{
                marginBottom: '25px',
                borderRadius: '8px',
                color: '#22703E',
                padding: '2rem'
            }}
            variant='outlined' >
            <Typography
                variant='h3'
                fontWeight='500'
            >{title}</Typography>
            <Typography>{description}</Typography>
        </Paper >
    )
}