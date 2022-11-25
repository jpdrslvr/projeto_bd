import FilterCard from '../components/FilterCard';
import Results from '../components/Results';
import SQLPreview from '../components/SQLPreview';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { getPesquisas, getFilters } from '../features/pesquisas/pesquisasSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const columns = [
  {
    name: 'ID Pesquisa',
    selector: (row) => row.id_pesquisa,
    sortable: false,
  },
  {
    name: 'Área de Pesquisa',
    selector: (row) => row.area_de_pesquisa,
    sortable: false,
    grow: 2,
  },
  {
    name: 'Acesso',
    selector: (row) => row.acesso,
    sortable: false,
  },
  {
    name: 'Grupo',
    selector: (row) => row.id_grupo + '. ' + row.nomeGrupo,
    sortable: false,
  },
];

const Pesquisas = () => {
  const [options, setOptions] = useState({
    areaDePesquisa: '',
    grupo: '',
    acesso: null,
  });

  const [search, setSearch] = useState('');

  const pesquisas = useSelector((state) => state.pesquisas);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPesquisas({ ...options, search }));
  }, [options, search]);

  const filters = useSelector((state) => state.pesquisas.filters);

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  return (
    <>
      <FilterCard
        filters={filters}
        labels={{ areaDePesquisa: 'Área de Pesquisa' }}
        options={options}
        setOptions={setOptions}
        search={search}
        setSearch={setSearch}
      />
      <SQLPreview queryString={pesquisas.queryString} />
      <Box component='div' sx={{ flexGrow: 1 }}>
        <Results columns={columns} data={pesquisas.result} />
      </Box>
    </>
  );
};

export default Pesquisas;
