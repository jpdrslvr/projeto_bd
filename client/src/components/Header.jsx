import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = ({ pathname }) => {
  const navigate = useNavigate();
  return (
    <AppBar position='static' color='transparent' elevation={0}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Button
            sx={{ color: pathname === '/pesquisadores' ? '#fff' : '#3C4B64' }}
            variant={pathname === '/pesquisadores' ? 'contained' : 'text'}
            onClick={() => navigate('/pesquisadores')}
          >
            22Pesquisadores
          </Button>
          <Button
            sx={{ color: pathname === '/pesquisas' ? '#fff' : '#3C4B64' }}
            variant={pathname === '/pesquisas' ? 'contained' : 'text'}
            onClick={() => navigate('/pesquisas')}
          >
            Pesquisas
          </Button>
          <Button
            sx={{ color: pathname === '/trabalhos' ? '#fff' : '#3C4B64' }}
            variant={pathname === '/trabalhos' ? 'contained' : 'text'}
            onClick={() => navigate('/trabalhos')}
          >
            Trabalhos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
