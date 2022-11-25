import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DataTable from 'react-data-table-component';

const Results = ({ columns, data }) => {
  return (
    <>
      <Typography color='primary' fontWeight={700} textTransform='uppercase'>
        Resultados da consulta
      </Typography>
      <Paper elevation={3}>
        <DataTable columns={columns} data={data} striped highlightOnHover />
      </Paper>
    </>
  );
};

export default Results;
