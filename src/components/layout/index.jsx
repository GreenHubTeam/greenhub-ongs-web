import { HeaderComponent } from '../header';
import { useAuth } from '../../context/authContext';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dashboard, ExitToApp, Person, Menu } from "@mui/icons-material";
import { Box, Grid2, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Drawer, useMediaQuery, AppBar, Toolbar, Stack } from "@mui/material";
import { useState } from 'react';

const linksNavs = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <Dashboard />
    },
    {
        name: 'Projetos',
        path: '/projects',
        icon: <CampaignIcon />
    },
    {
        name: 'Posts',
        path: '/posts',
        icon: <ChatBubbleIcon />
    },
];

// eslint-disable-next-line react/prop-types
export default function LayoutAppComponent({ children }) {
    const { pathname: pathName } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    function Logout() {
        logout();
        navigate('/');
    }

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{
                width: '70vw',
                padding: '1rem',
                height: '100dvh',
                overflowY: 'auto',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <HeaderComponent />
            <List sx={{ marginTop: '1rem' }}>
                {linksNavs.map((link, index) => (
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
                                    backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '#F1F1F1',
                                },
                                backgroundColor: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'rgba(0, 128, 0, 0.1)' : '',
                                color: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'green' : '',
                            }}
                        >
                            <ListItemIcon sx={{ color: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'rgba(0, 128, 0, 0.5)' : '' }}>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.name} />
                        </ListItemButton>
                    </Box>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        {drawerContent}
                    </Drawer>
                    <AppBar
                        sx={{
                            backgroundColor: 'white'
                        }}
                        variant='outlined'
                        position='sticky'
                    >
                        <Toolbar
                            sx={{
                                justifyContent: 'space-between'
                            }}
                        >
                            <IconButton onClick={toggleDrawer(true)}>
                                <Menu />
                            </IconButton>

                            <Stack direction='row'>
                                <IconButton onClick={Logout}>
                                    <ExitToApp />
                                </IconButton>
                                <IconButton onClick={() => navigate('/perfil')}>
                                    <Person />
                                </IconButton>
                            </Stack>
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            padding: '1rem',
                            overflowY: 'auto',
                            flex: 1
                        }}
                    >
                        {children}
                    </Box>
                </>
            ) : (
                <Grid2 container>
                    <Grid2 size={2.5}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRight: 2,
                                borderColor: '#F0F0F0',
                                padding: '1rem',
                                height: '100vh',
                                overflowY: 'auto',
                            }}
                        >
                            <HeaderComponent />
                            <List sx={{ marginTop: '1rem' }}>
                                {linksNavs.map((link, index) => (
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
                                                    backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '#F1F1F1',
                                                },
                                                backgroundColor: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'rgba(0, 128, 0, 0.1)' : '',
                                                color: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'green' : '',
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: (pathName === link.path || (pathName === '/' && link.path === '/dashboard')) ? 'rgba(0, 128, 0, 0.5)' : '' }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    </Grid2>
                    <Grid2 size={9.5} >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100vh',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    padding: '1rem',
                                    borderBottom: '1px solid #F0F0F0'
                                }}
                            >
                                <IconButton onClick={Logout}>
                                    <ExitToApp />
                                </IconButton>
                                <IconButton onClick={() => navigate('/perfil')}>
                                    <Person />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    padding: '1rem',
                                    overflowY: 'auto',
                                    flex: 1
                                }}
                            >
                                {children}
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            )
            }
        </>
    );
}