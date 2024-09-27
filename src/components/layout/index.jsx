import { HeaderComponent } from '../header';
import { useAuth } from '../../context/authContext';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dashboard, ExitToApp, Person, } from "@mui/icons-material";
import { Box, Grid2, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

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
]

// eslint-disable-next-line react/prop-types
export default function LayoutAppComponent({ children }) {
    const { pathname: pathName } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    function Logout() {
        logout();
        navigate('/')
    }

    return (
        <>
            <Grid2 container
            >
                <Grid2 size={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRight: 2,
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
                </Grid2>
                <Grid2 size={10}>
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

                            <IconButton
                                onClick={Logout}
                            >
                                <ExitToApp />
                            </IconButton>
                            <IconButton
                                onClick={() => navigate('/perfil')}
                            >
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
        </>
    )
}