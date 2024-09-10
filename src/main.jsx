import React from 'react';
import theme from './styles/theme';
import ReactDOM from 'react-dom/client';
import { Cadastro } from './pages/cadastro';
import GlobalStyles from './styles/global';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Cadastro />
    </ThemeProvider>

  </React.StrictMode>,
)
