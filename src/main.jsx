import React from 'react';
import ReactDOM from 'react-dom/client';
import { CadastroPage } from './pages/cadastro';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from '@mui/material';
import {LoginPage} from './pages/login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ fontFamily: 'Inter ,sans-serif' }}>
        <LoginPage />
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
