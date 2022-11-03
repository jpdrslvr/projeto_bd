import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        position: 'fixed',
        left: 0,
        bottom: 0,
        backgroundColor: '#3C4B64',
        width: '100%',
        height: '3vh',
        color: '#fff',
        padding: 2,
      }}
    >
      {/* Inserir rodapé */}
      Projeto de Banco de Dados
      <Divider orientation='vertical' sx={{ bgcolor: 'primary.light' }} />
      nomes
    </Box>
  );
};

export default Footer;
