import { useState } from 'react';
import { Box, Typography, } from '@mui/material';

export function CardPost({ description, OngName, profilePath, createdAt, postImagePath }) {
    return (
        <Box>
            <Box
                sx={{
                    padding: '2rem',
                    margin: '4.5rem',
                    display: 'flex',
                    gap: '1.5rem',
                    flexDirection: 'column',
                    height: 'auto',
                    width: '95%',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    backgroundColor: '#E7E7E7',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        margin: '0 2rem'
                    }}
                >
                    <img
                        src={profilePath}
                        alt="Foto de perfil"
                        style={{ width: '65px', height: '65px', borderRadius: '50%', marginRight: '1rem' }}
                    />

                    <Typography variant='h6' sx={{}}> {OngName} </Typography>
                </Box>

                <Typography
                    sx={{
                        margin: ' 0 7rem',
                        marginTop: '-40px',
                        marginBottom: '2rem'
                    }}
                >
                    {description}
                </Typography>
                
                <>
                    {postImagePath && (
                         <img
                         src= {postImagePath}
                         alt="Imagem do post"
                         style={{ width: '65px', height: '65px', marginRight: '1rem' }}
                     />
                    )}
                </>
               
            </Box>
        </Box>
    )
}