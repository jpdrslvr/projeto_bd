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
        height: 'auto',
        color: '#fff',
        padding: 2,
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
        fontSize: '0.9rem',
      }}
    >
      <strong>Projeto de Banco de Dados - Pesquisadores</strong>
      <Divider
        orientation='vertical'
        sx={{ bgcolor: '#F3F3F3', height: 'auto', borderRightWidth: 3 }}
      />
      João Pedro Silveira, Gustavo Dias Souza e Luiz Vitalino
    </Box>
  );
};

export default Footer;
