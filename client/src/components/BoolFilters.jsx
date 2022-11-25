import { FormControlLabel, Checkbox } from '@mui/material';
const BoolFilters = ({ options, setBoolOptions }) => {
  return Object.keys(options).map((option) => (
    <FormControlLabel
      label={option}
      key={option}
      sx={{
        textTransform: 'capitalize',
      }}
      control={
        <Checkbox
          checked={options[option]}
          onChange={(e) =>
            setBoolOptions((prevState) => ({
              ...prevState,
              [option]: !prevState[option],
            }))
          }
        />
      }
    />
  ));
};

export default BoolFilters;
