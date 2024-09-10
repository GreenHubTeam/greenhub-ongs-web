import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {Cadastro} from './pages/cadastro';
import {Header} from './components/header';
import {Input} from './components/input';

import GlobalStyles from './styles/global';

import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Cadastro/>
    </ThemeProvider>

  </React.StrictMode>,
)
