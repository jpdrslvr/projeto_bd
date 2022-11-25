import FilterCard from '../components/FilterCard';
import Results from '../components/Results';
import SQLPreview from '../components/SQLPreview';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { getTrabalhos, getFilters } from '../features/trabalhos/trabalhosSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Trabalhos = () => {
  const [options, setOptions] = useState({
    volume: '',
  });

  const [boolOptions, setBoolOptions] = useState({
    publicados: false,
    apresentados: false,
  });

  const [search, setSearch] = useState('');

  const trabalhos = useSelector((state) => state.trabalhos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrabalhos({ ...options, ...boolOptions, search }));
  }, [options, search, boolOptions]);

  const filters = useSelector((state) => state.trabalhos.filters);

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  const columns = [
    {
      name: 'ID Trabalho',
      selector: (row) => row.id_trabalho,
      width: '8%',
      sortable: false,
    },
    {
      name: 'Título',
      selector: (row) => row.titulo,
      sortable: false,
      wrap: true,
    },
    {
      name: 'Data de finalização',
      selector: (row) => row.data_finalizacao,
      sortable: false,
      format: (row) => {
        const date = new Date(row.data_finalizacao);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options);
      },
    },
    {
      name: 'Volume',
      selector: (row) => row.volume,
      sortable: false,
      width: '8%',
    },
    {
      name: 'Qualis',
      selector: (row) => row.qualis,
      sortable: false,
      width: '8%',
      omit: !boolOptions.publicados,
    },
    {
      name: 'Nota',
      selector: (row) => row.nota,
      sortable: false,
      width: '8%',
      omit: !boolOptions.apresentados,
    },
    {
      name: 'Periódico',
      selector: (row) => row.periodico,
      sortable: false,
      width: '8%',
      omit: !boolOptions.publicados,
    },
    {
      name: 'DOI',
      selector: (row) => row.doi,
      sortable: false,
      width: '15%',
      omit: !boolOptions.publicados,
    },
    {
      name: 'Resumo',
      selector: (row) => row.resumo,
      sortable: false,
      wrap: false,
      grow: 2,
      style: {
        textOverflow: 'ellipsis',
        maxWidth: 800,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  ];

  return (
    <>
      <FilterCard
        filters={filters}
        options={options}
        setOptions={setOptions}
        search={search}
        setSearch={setSearch}
        boolOptions={boolOptions}
        setBoolOptions={setBoolOptions}
      />
      <SQLPreview queryString={trabalhos.queryString} />
      <Box component='div' sx={{ flexGrow: 1 }}>
        <Results columns={columns} data={trabalhos.result} />
      </Box>
    </>
  );
};

export default Trabalhos;
