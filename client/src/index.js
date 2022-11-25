import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#F3F3F3',
    },
    primary: {
      main: '#3C4B65',
    },
    secondary: {
      main: '#2ba94d',
    },
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#f44336',
    },
  },
});
const Pesquisadores = React.lazy(() => import('./pages/Pesquisadores'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='*' element={<App />} exact />
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
);
