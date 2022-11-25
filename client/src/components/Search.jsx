import { TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchDiv = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.primary.main,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: alpha('#eee', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
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

const ClearIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  right: 0,
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

const Search = ({ search, setSearch }) => {
  return (
    <SearchDiv>
      <SearchIconWrapper>
        <SearchIcon color={'primary'} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Pesquisar…'
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <ClearIconWrapper
        style={{
          display: search ? 'flex' : 'none',
          cursor: 'pointer',
          zIndex: 5,
        }}
        onClick={() => {
          setSearch('');
        }}
      >
        <ClearIcon color={'primary'} />
      </ClearIconWrapper>
    </SearchDiv>
  );
};

export default Search;
