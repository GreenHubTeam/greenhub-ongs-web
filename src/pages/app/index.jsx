import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import LayoutAppComponent from "../../components/layout";
import { useLocation } from "react-router-dom";

export function AppPage() {
    const location = useLocation();

    return (
        <LayoutAppComponent>
            {location.pathname === '/' && (
                <Box sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '90vh',
                    mb: 2,
                }}
                >
                    <Typography variant='h1' sx={{ fontWeight: 700 }}>Seja bem-vindo ao</Typography>
                    <Typography variant='h1' sx={{ fontWeight: 700 }}>
                        <span style={{ color: '#22703E' }}>Gre</span>
                        <span style={{ color: '#3A914D' }}>en</span>
                        <span style={{ color: '#3A914D' }}>Hub</span>
                    </Typography>
                </Box>
            )}
            <Outlet />
        </LayoutAppComponent>
    );
}
