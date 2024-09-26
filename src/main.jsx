import React from 'react';
import { theme } from './theme';
import { Box } from '@mui/material';
import { RoutesMain } from './routes';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Box sx={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        <AuthProvider>
          <RoutesMain />
        </AuthProvider>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
