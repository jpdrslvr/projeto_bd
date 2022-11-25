import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Pesquisadores from './pages/Pesquisadores';
import Pesquisas from './pages/Pesquisas';
import Trabalhos from './pages/Trabalhos';

// const Pesquisadores = React.lazy(() => import('./pages/Pesquisadores'));
export default function App() {
  const location = useLocation();

  return (
    <>
      <Container
        component='main'
        maxWidth='xl'
        sx={{ display: 'flex', pt: 1, flexDirection: 'column', gap: 1 }}
      >
        <Header pathname={location.pathname} />
        <Routes>
          <Route path='/' element={<Navigate to='/pesquisadores' />} />
          <Route path='/pesquisadores' element={<Pesquisadores />} exact />
          <Route path='/pesquisas' element={<Pesquisas />} exact />
          <Route path='/trabalhos' element={<Trabalhos />} exact />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
