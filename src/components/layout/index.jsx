'use client'

import LogoutIcon from '@mui/icons-material/Logout';
import { Dashboard, CorporateFare, AccountBox, Assessment } from "@mui/icons-material";
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { HeaderComponent } from '../header';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const linksNavs = [
    {
        name: 'Dashboard',
        path: '/hub/dashboard',
        icon: <Dashboard />
    },
    {
        name: 'Post',
        path: '/post',
        icon: <CampaignIcon />
    },
    {
        name: 'Perfil',
        path: '/perfil',
        icon: <AccountCircleIcon />
    },
]

export default function LayoutAppComponent({ children }) {
    const { pathname: pathName } = useLocation();

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '300px',
                        flexDirection: 'column',
                        borderRight: 1,
                        borderColor: '#F0F0F0',
                        padding: '1rem',
                        height: '100vh',
                        overflowY: 'auto',
                    }}>
                    <HeaderComponent />

                    <List sx={{ marginTop: '1rem' }}>
                        {
                            linksNavs.map((link, index) => (
                                <Box key={index} component={Link} to={link.path} sx={{
                                    textDecoration: 'none',
                                    color: "#6D6D6D",
                                    fontSize: '.9rem',
                                }}>
                                    <ListItemButton
                                        sx={{
                                            borderRadius: '8px',
                                            marginBottom: '.2rem',
                                            '&:hover': {
                                                backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '#F1F1F1', // Fundo verde transparente
                                            },
                                            backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.1)' : '',
                                            color: pathName.includes(link.path) ? 'green' : '',
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '' }}>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} />
                                    </ListItemButton>
                                </Box>
                            ))
                        }

                    </List>
                </Box >

                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {children}
                </Box>
            </Box >
        </>
    )
}