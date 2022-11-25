const asyncHandler = require('express-async-handler');
const { query } = require('../config/db');

// -------------------------------------------------------
// REQUESTS DA ABA PESQUISADORES
// -------------------------------------------------------

// @desc   Get pesquisadores
// @route  GET /pesquisadores
// @access Public
const getPesquisadores = asyncHandler(async (req, res) => {
  let queryString = `SELECT P.*, G.nome AS nomeGrupo
FROM pesquisadores AS P
JOIN grupo_de_pesquisa AS G
ON P.id_grup = G.id_grupo`;

  const filters = {
    and: [],
    or: [],
  };

  // Filtros
  if (req.query.nacionalidade) {
    filters.and.push(`nacionalidade = '${req.query.nacionalidade}'`);
  }
  if (req.query.grupo) {
    filters.and.push(`G.nome = '${req.query.grupo}'`);
  }
  if (req.query.search) {
    filters.or.push(`  P.nome LIKE '%${req.query.search}%'`);
    filters.or.push(`  P.cpf LIKE '%${req.query.search}%'`);
    filters.or.push(`  P.telefone LIKE '%${req.query.search}%'`);
    filters.or.push(`  P.id_lattes LIKE '%${req.query.search}%'`);
  }

  if (filters.and.length || filters.or.length) {
    const or = `${filters.and.length && filters.or.length ? ' AND ' : ''}${
      filters.or.length ? '(\n' : ''
    }${filters.or.join(' OR \n')}${filters.or.length ? '\n)' : ''}`;
    queryString += '\nHAVING ' + filters.and.join(' AND ') + or + ';';
  } else {
    queryString += ';';
  }

  const results = await query(queryString);

  res.status(200).json({ result: results, queryString: queryString });
});

// @desc   Get filtros dos pesquisadores
// @route  GET /getFilters
// @access Public
const getFiltersPesquisadores = asyncHandler(async (req, res) => {
  const grupo = await query(`
    SELECT nome FROM grupo_de_pesquisa;
  `);

  const nacionalidade = await query(`
    SELECT DISTINCT nacionalidade FROM pesquisadores;
  `);

  res.status(200).json({
    grupo: grupo.map((g) => g.nome),
    nacionalidade: nacionalidade.map((n) => n.nacionalidade),
  });
});

// -------------------------------------------------------
// REQUESTS DA ABA PESQUISAS
// -------------------------------------------------------

// @desc   Get pesquisas
// @route  GET /pesquisas
// @access Public
const getPesquisas = asyncHandler(async (req, res) => {
  let queryString = `SELECT P.*, G.nome AS nomeGrupo 
FROM pesquisas AS P
JOIN grupo_de_pesquisa AS G
ON P.id_grupo = G.id_grupo`;

  const filters = {
    and: [],
    or: [],
  };

  //Filtros;
  if (req.query.areaDePesquisa) {
    filters.and.push(`area_de_pesquisa = '${req.query.areaDePesquisa}'`);
  }
  if (req.query.grupo) {
    filters.and.push(`G.nome = '${req.query.grupo}'`);
  }
  if (req.query.search) {
    filters.or.push(`  area_de_pesquisa LIKE '%${req.query.search}%'`);
    filters.or.push(`  id_pesquisa LIKE '%${req.query.search}%'`);
  }

  if (filters.and.length || filters.or.length) {
    const or = `${filters.and.length && filters.or.length ? ' AND ' : ''}${
      filters.or.length ? '(\n' : ''
    }${filters.or.join(' OR \n')}${filters.or.length ? '\n)' : ''}`;
    queryString += '\nHAVING ' + filters.and.join(' AND ') + or + ';';
  } else {
    queryString += ';';
  }

  const results = await query(queryString);

  res.status(200).json({ result: results, queryString: queryString });
});

// @desc   Get filtros das pesquisas
// @route  GET /getFilters
// @access Public
const getFiltersPesquisas = asyncHandler(async (req, res) => {
  const grupo = await query(`
    SELECT nome FROM grupo_de_pesquisa;
  `);

  const areaDePesquisa = await query(`
    SELECT DISTINCT area_de_pesquisa FROM pesquisas;
  `);

  const acesso = await query(`
    SELECT DISTINCT acesso FROM pesquisas;
  `);

  res.status(200).json({
    grupo: grupo.map((g) => g.nome),
    areaDePesquisa: areaDePesquisa.map((n) => n.area_de_pesquisa),
    acesso: acesso.map((g) => g.acesso),
  });
});

// -------------------------------------------------------
// REQUESTS DA ABA TRABALHOS
// -------------------------------------------------------

// @desc   Get pesquisas
// @route  GET /pesquisas
// @access Public
const getTrabalhos = asyncHandler(async (req, res) => {
  let queryString = `SELECT *
FROM trabalhos AS T`;

  const filters = {
    and: [],
    or: [],
  };

  if (req.query.publicados === 'true') {
    queryString += `\nLEFT JOIN publicados AS P
ON T.id_trabalho = P.id_trab`;
  }
  if (req.query.apresentados === 'true') {
    queryString += `\nLEFT JOIN apresentados AS A
ON T.id_trabalho = A.id_trab`;
  }

  //Filtros;
  if (req.query.volume) {
    filters.and.push(`volume = '${req.query.volume}'`);
  }

  if (req.query.search) {
    filters.or.push(`  titulo LIKE '%${req.query.search}%'`);
    filters.or.push(`  resumo LIKE '%${req.query.search}%'`);
  }

  if (filters.and.length || filters.or.length) {
    const or = `${filters.and.length && filters.or.length ? ' AND ' : ''}${
      filters.or.length ? '(\n' : ''
    }${filters.or.join(' OR \n')}${filters.or.length ? '\n)' : ''}`;
    queryString += '\nHAVING ' + filters.and.join(' AND ') + or + ';';
  } else {
    queryString += ';';
  }

  const results = await query(queryString);

  res.status(200).json({ result: results, queryString: queryString });
});

// @desc   Get filtros das pesquisas
// @route  GET /getFilters
// @access Public
const getFiltersTrabalhos = asyncHandler(async (req, res) => {
  const volume = await query(`
    SELECT DISTINCT volume FROM trabalhos;
  `);

  res.status(200).json({
    volume: volume.map((v) => String(v.volume)),
  });
});

module.exports = {
  getPesquisadores,
  getFiltersPesquisadores,
  getPesquisas,
  getFiltersPesquisas,
  getTrabalhos,
  getFiltersTrabalhos,
};
