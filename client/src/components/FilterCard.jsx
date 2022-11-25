import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Search from './Search';
import Filters from './Filters';
import BoolFilters from './BoolFilters';

const FilterCard = ({
  filters,
  options,
  labels = {},
  setOptions,
  search,
  setSearch,
  boolOptions = {},
  setBoolOptions,
}) => {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        width: '100%',
        gap: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          gap: 1,
        }}
      >
        <Box component='div' sx={{ flexGrow: 1 }}>
          <Search search={search} setSearch={setSearch} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Filters
            filters={filters}
            labels={labels}
            options={options}
            setOptions={setOptions}
          />
          <BoolFilters options={boolOptions} setBoolOptions={setBoolOptions} />
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterCard;
