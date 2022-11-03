import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from './components/Footer';
import Search from './components/Search';
import Filters from './components/Filters';

export default function App() {
  return (
    <>
      <Container component='main' maxWidth='xl' sx={{ display: 'flex', pt: 3 }}>
        <Box component='div' sx={{ display: 'flex', width: '100%', gap: 1 }}>
          <Box component='div' sx={{ flexGrow: 1 }}>
            <Search />
          </Box>
          <Filters />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
