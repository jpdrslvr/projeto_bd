import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const options = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Ano', value: 'ano' },
  { label: 'Autor', value: 'autor' },
  { label: 'Título', value: 'titulo' },
];

const Search_ = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: alpha('#eee', 0.25),
    },
    marginLeft: 0,
    width: '100%',
  };
});

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: '100%',
  // border: 'none',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Filters = () => {
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={options}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <Search_>
          <StyledInputBase
            variant='outlined'
            {...params}
            label='Filtros'
            size='small'
          />
        </Search_>
      )}
    />
  );
};

export default Filters;
