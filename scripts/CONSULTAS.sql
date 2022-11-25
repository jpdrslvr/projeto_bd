-- ---------------------------------------------------
-- CONSULTAS
-- ---------------------------------------------------
-- 1. Lista os pesquisadores
SELECT
	*
FROM
	pesquisadores;

-- 2. Lista os trabalhos gerados pós 2020
SELECT
	*
FROM
	trabalhos AS T
WHERE
	DATE(T.data_finalizacao) > '2020-01-01';

-- 3. Lista nome dos pesquisadores e nome do grupo de pesquisa
SELECT
	CONCAT(pesquisadores.nome, ' ', pesquisadores.sobrenome),
	grupo_de_pesquisa.nome
FROM
	pesquisadores
	JOIN grupo_de_pesquisa ON pesquisadores.id_grup = grupo_de_pesquisa.id_grupo;

-- 4. Lista pesquisadores com trabalhos apresentados
SELECT
	DISTINCT CONCAT(nome, ' ', sobrenome) AS nome
FROM
	pesquisadores AS P
	JOIN autores as A ON p.id_lattes = A.autor
	JOIN apresentados as AP ON AP.id_trab = A.id_trab;

-- 5. Trabalhos publicados onde autor = 'Ana'
SELECT titulo FROM (
	SELECT
		DISTINCT titulo, autor
	FROM
		trabalhos as T
		JOIN publicados as P ON T.id_trabalho = P.id_trab
		JOIN autores as A ON A.id_trab = P.id_trab
		HAVING A.autor = '1435405686437314'
) AS T;

-- 6. Grupos de pesquisa com mais de 2 integrantes
SELECT
	COUNT(P.id_lattes) AS nIntegrantes,
	G.nome AS grupo
FROM
	pesquisadores as P
	JOIN grupo_de_pesquisa as G ON G.id_grupo = P.id_grup
GROUP BY
	P.id_grup
HAVING
	nIntegrantes > 2;

-- 7. Áreas de pesquisa por grupo de pesquisa
SELECT
	area_de_pesquisa
FROM
	(
		SELECT
			DISTINCT area_de_pesquisa,
			nome
		FROM
			pesquisas as P
			JOIN grupo_de_pesquisa as G ON P.id_grupo = G.id_grupo
		HAVING
			G.nome = 'Grupo A'
	) AS T;