import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PUBLIC_URL + '/api/pesquisadores'
    : '/api/pesquisadores';

const getPesquisadores = async (options = {}) => {
  const config = {
    params: options,
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getFilters = async () => {
  const response = await axios.get(API_URL + '/getFilters');

  return response.data;
};

const pesquisadoresService = {
  getPesquisadores,
  getFilters,
};

export default pesquisadoresService;
