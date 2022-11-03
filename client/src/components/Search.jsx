import { InputBase, TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search_ = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: alpha('#eee', 0.25),
    },
    marginLeft: 0,
    width: '100%',
  };
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Search = () => {
  return (
    <Search_>
      <SearchIconWrapper>
        <SearchIcon color={'primary'} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Pesquisar…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search_>
  );
};

export default Search;
