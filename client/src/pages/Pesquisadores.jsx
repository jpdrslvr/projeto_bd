import FilterCard from '../components/FilterCard';
import Results from '../components/Results';
import SQLPreview from '../components/SQLPreview';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  getPesquisadores,
  getFilters,
} from '../features/pesquisadores/pesquisadoresSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from '@mui/material';

const columns = [
  {
    name: 'ID Lattes',
    selector: (row) => (
      <Link
        href={`http://lattes.cnpq.br/${row.id_lattes}`}
        target='blank_'
        rel='noreferrer'
      >
        {row.id_lattes}
      </Link>
    ),
    sortable: false,
  },
  {
    name: 'Nome',
    selector: (row) => row.nome + ' ' + row.sobrenome,
    sortable: false,
  },
  {
    name: 'CPF',
    selector: (row) =>
      row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    sortable: false,
  },
  {
    name: 'Nacionalidade',
    selector: (row) => row.nacionalidade,
    sortable: false,
  },
  {
    name: 'Telefone',
    selector: (row) => row.telefone,
    sortable: false,
  },
  {
    name: 'Grupo',
    selector: (row) => row.id_grup + '. ' + row.nomeGrupo,
    sortable: false,
  },
];

const Pesquisadores = () => {
  const [options, setOptions] = useState({
    nacionalidade: '',
    grupo: '',
  });

  const [search, setSearch] = useState('');

  const pesquisadores = useSelector((state) => state.pesquisadores);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPesquisadores({ ...options, search }));
  }, [options, search]);

  const filters = useSelector((state) => state.pesquisadores.filters);

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  return (
    <>
      <FilterCard
        filters={filters}
        options={options}
        setOptions={setOptions}
        search={search}
        setSearch={setSearch}
      />
      <SQLPreview queryString={pesquisadores.queryString} />
      <Box component='div' sx={{ flexGrow: 1 }}>
        <Results columns={columns} data={pesquisadores.result} />
      </Box>
    </>
  );
};

export default Pesquisadores;
