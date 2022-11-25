import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';

const Search = styled('div')(({ theme }) => {
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
  textTransform: 'capitalize',
  // border: 'none',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Filters = ({ filters, options, setOptions, labels = {} }) => {
  return Object.keys(options).map((option) => (
    <Autocomplete
      key={option}
      disablePortal
      options={(option && filters[option]) || []}
      sx={{
        width: {
          xs: '100%',
          sm: 200,
        },
      }}
      renderInput={(params) => (
        <Search>
          <StyledInputBase
            variant='outlined'
            {...params}
            label={labels[option] || option}
            size='small'
          />
        </Search>
      )}
      onChange={(event, value) => {
        setOptions((prev) => ({
          ...prev,
          [option]: value,
        }));
      }}
    />
  ));
};

export default Filters;
