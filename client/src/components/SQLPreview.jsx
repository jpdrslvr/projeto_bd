import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Highlight from 'react-highlight';
import 'highlight.js/styles/vs2015.css';

const SQLPreview = ({ queryString }) => {
  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}
    >
      <Typography color='primary' fontWeight={700} textTransform='uppercase'>
        Preview do SQL
      </Typography>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: '100%',
          gap: 1,
          backgroundColor: '#1E1E1E',
          px: 1,
          overflowX: 'auto',
        }}
      >
        <Highlight language='sql'>{queryString}</Highlight>
      </Paper>
    </Box>
  );
};

export default SQLPreview;
