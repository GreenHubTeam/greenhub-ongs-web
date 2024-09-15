import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from '@mui/material';
import { RoutesMain } from './routes';
import { AuthPai } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ fontFamily: 'Inter ,sans-serif' }}>
        <AuthPai>
          <RoutesMain />
        </AuthPai>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
