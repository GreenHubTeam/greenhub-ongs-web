import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from '@mui/material';
import { RoutesMain } from './routes';
import { AuthPai } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Box sx={{ fontFamily: 'Roboto, sans-serif' }}>
        <AuthPai>
          <RoutesMain />
        </AuthPai>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
