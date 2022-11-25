-- ---------------------------------------------------
-- INICIALIZAÇÃO DA BASE DE DADOS E CRIAÇÃO DE TABELAS
-- ---------------------------------------------------
DROP DATABASE if EXISTS pesquisa;

-- cria a base de dados
CREATE DATABASE pesquisa;

USE pesquisa;

/*
 * Cria as tabelas pesquisadores, grupo_de_pesquisa, pesquisas,
 * trabalhos, apresentados, publicados e faz_parte.
 */
-- cria tabela pesquisadores
CREATE TABLE pesquisadores (
  id_lattes CHAR(16) NOT NULL,
  nome VARCHAR(30) NOT NULL,
  sobrenome VARCHAR(30) NOT NULL,
  cpf char(11) NOT NULL,
  nacionalidade VARCHAR(20),
  endereco VARCHAR(30) DEFAULT 'Brasil',
  sexo ENUM('M', 'F'),
  telefone char(11),
  id_grup INT NOT NULL,
  formacao VARCHAR(150),
  PRIMARY KEY (id_lattes)
);

-- cria tabela dos grupos de pesquisa
create table grupo_de_pesquisa (
  id_grupo INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30),
  instituição VARCHAR(20),
  PRIMARY KEY (id_grupo)
);

-- adiciona chave estrangeira à tabela pesquisadores
ALTER TABLE
  pesquisadores
ADD
  FOREIGN KEY(id_grup) REFERENCES grupo_de_pesquisa(id_grupo) ON DELETE CASCADE ON UPDATE CASCADE;

-- cria tabela das pesquisas
CREATE TABLE pesquisas (
  id_pesquisa INT NOT NULL AUTO_INCREMENT,
  area_de_pesquisa VARCHAR(150),
  acesso boolean,
  id_grupo INT NOT NULL,
  PRIMARY KEY (id_pesquisa),
  FOREIGN KEY(id_grupo) REFERENCES grupo_de_pesquisa(id_grupo)
);

-- cria tabela dos trabalhos
CREATE TABLE trabalhos (
  id_trabalho INT NOT NULL,
  titulo VARCHAR(500) NOT NULL,
  data_finalizacao DATE,
  volume INT,
  resumo VARCHAR(2000),
  PRIMARY KEY (id_trabalho)
);

-- cria tabela autores
CREATE TABLE autores (
  id_trab INT NOT NULL,
  autor CHAR(16) NOT NULL,
  FOREIGN KEY(id_trab) REFERENCES trabalhos(id_trabalho),
  FOREIGN KEY(autor) REFERENCES pesquisadores(id_lattes)
);

-- cria tabela dos trabalhos apresentados
CREATE TABLE apresentados (
  id_apresentado INT NOT NULL,
  nota TINYINT,
  id_trab INT NOT NULL,
  PRIMARY KEY(id_apresentado),
  FOREIGN KEY(id_trab) REFERENCES trabalhos(id_trabalho)
);

-- cria tabelas dos trabalhos publicados
CREATE TABLE publicados (
  id_trab INT NOT NULL,
  qualis VARCHAR(30),
  periodico VARCHAR(20),
  doi VARCHAR(100) NOT NULL,
  PRIMARY KEY(doi),
  FOREIGN KEY(id_trab) REFERENCES trabalhos(id_trabalho)
);

-- ---------------------------------------------------
-- INSERÇÃO DE DADOS
-- ---------------------------------------------------
-- insere dados na tabela grupo_de_pesquisa
INSERT INTO
  grupo_de_pesquisa (nome, instituição)
VALUES
  ('Grupo A', 'UFPEL'),
  ('Grupo B', 'UFPEL'),
  ('Grupo C', 'UFPEL');

-- insere dados na tabela pesquisadores
INSERT INTO
  pesquisadores (
    id_lattes,
    nome,
    sobrenome,
    cpf,
    nacionalidade,
    endereco,
    sexo,
    telefone,
    id_grup,
    formacao
  )
VALUES
  (
    '1435405686437314',
    'Ana Marilza',
    'Pernas',
    '45698785390',
    'Brasil',
    'Av. H. 8',
    'F',
    '53999999999',
    1,
    'doutorado'
  ),
  (
    '1097468139544018',
    'Luciana',
    'Foss',
    '15698785380',
    'Brasil',
    'Av. H. 7',
    'F',
    '33999999998',
    1,
    'doutorado'
  ),
  (
    '9604735363839730',
    'Luciano',
    'Volcan',
    '35699425310',
    'Brasil',
    'Av. H. 6',
    'M',
    '73999999997',
    1,
    'doutorado'
  ),
  (
    '3499616508280892',
    'Marilton',
    'Sanchotene',
    '85699565310',
    'Brasil',
    'Av. H. 5',
    'M',
    '63999999996',
    2,
    'doutorado'
  ),
  (
    '3941460073542194',
    'Larissa',
    'Astrogildo',
    '95699565317',
    'Brasil',
    'Av. H. 4',
    'F',
    '43999996696',
    2,
    'doutorado'
  ),
  (
    '4245960736253653',
    'Luiz',
    'Vitalino',
    '75699534316',
    'Brasil',
    'Av. H. 3',
    'M',
    '53999996696',
    3,
    'graduação incompleta'
  ),
  (
    '7834818734456189',
    'Gustavo',
    'Souza',
    '85699565315',
    'Brasil',
    'Av. H. 2',
    'M',
    '93999996696',
    3,
    'graduação incompleta'
  ),
  (
    '4136234658803252',
    'João',
    'Silveira',
    '65699565313',
    'Brasil',
    'Av. H. 1',
    'M',
    '13999996696',
    3,
    'graduação incompleta'
  );

-- insere dados na tabela pesquisas
insert into
  pesquisas (area_de_pesquisa, acesso, id_grupo)
values
  ('IA', 1, 1),
  ('Iot', 1, 2),
  ('Geoprocessamento', 1, 3),
  ('Desenvolvimento de Algoritmos', 1, 2),
  (
    'Avaliação da Experiência de Pacientes pela Análise de Sentimento',
    1,
    3
  );

-- insere dados na tabela trabalhos
INSERT INTO
  trabalhos (
    id_trabalho,
    titulo,
    data_finalizacao,
    volume,
    resumo
  )
VALUES
  (
    1,
    'A Translation from Object-Based Hypergraph Grammars into pi-Calculus.',
    '2004-01-02',
    1,
    'Object-based models offer abstract constructions to describe complex systems. The Object-Based Graph Grammar (OBGG) is a formalism that may be used to describe this kind of system. This formalism is very intuitive, however, up to now, there are no automatic tools for verification of OBGGs. In this work we propose a translation from Object-Based Hypergraph Grammars into π-Calculus. So, we may be able to prove properties of the systems modeled in this kind of graph grammars through this translation and automatic checkers for pi-calculus.'
  ),
  (
    2,
    'An IoT Architecture to Provide Hybrid Context Reasoning.',
    '2020-03-20',
    1,
    'Considering the dynamic nature of the modern computational infrastructures provided by IoT, applications need to be aware of the contextual data that interest them, to be able to operate with as little human intervention as possible. Thus, context awareness becomes a key concept to provide adaptive services in IoT environments. Context reasoning is one of the more critical steps to obtain context awareness. However, a context reasoning strategy that can be applied satisfactorily in different application domains has not yet been found. Because of this, hybrid strategies for context reasoning are gaining prominence. In the literature, some researchers explore hybrid proposals, but these proposals do not offer flexibility on the use of the reasoning strategies. In this research, we conceive hybrid reasoning based on compositional rules, enabling a dynamic composition of different strategies. Thus, the context-aware applications can choose among different reasoning strategies, those that are most appropriate depending on the contexts that will be treated. To validate our architecture, we design and test it on a scenario based on healthcare. The obtained results showed that our architecture allows the utilization of hybrid strategies for context reasoning, improving situations identification, and decision-making.'
  ),
  (
    3,
    'Learning-based bypass zone search algorithm for fast motion estimation',
    '2022-01-01',
    1,
    'Video coding has been widely explored by academia and industry in recent years, mainly due to the great popularization of video applications and multimedia-capable devices. The Motion Estimation (ME) process receives special attention since it is one of the most complex steps in video coding. The Test Zone Search (TZS) is the main algorithm employed for integer ME in recent video codecs, such as those based on the High Efficiency Video Coding (HEVC), and has been used in the standardization process of the future Versatile Video Coding (VVC) standard. However, even though it is designed as a fast ME algorithm, the computational effort required by TZS is still very high, compromising the encoding process in multimedia-capable devices that operate on limited energy or computational resources. This work presents the Bypass Zone Search (BZS) algorithm, a learning-based solution for fast ME that improves TZS, aiming at a better tradeoff between compression efficiency and computational cost. First, a set of analyses on TZS is presented, which allowed the design of two strategies to reduce the ME computational cost. The first one, named as Learning-based Bypass Motion Estimation (LBME), consists of a machine learning-based approach that predicts whether the best motion vector has already been found and bypasses the remaining ME steps. The second strategy, named as Astroid Raster Pattern (ARP), is a novel search pattern developed for the most complex TZS step, the Raster Search. By combining the two proposed strategies in BZS, the ME processing time is reduced by 60.98% (Random Access) and 63.05% (Low Delay) in comparison to TZS. The overall HEVC encoding time is reduced by 14.32% (Random Access) and 17.64% (Low Delay), with a negligible loss of 0.0837% (Random Access) and 0.04% (Low Delay) in BD-rate.'
  ),
  (
    4,
    'HPC-ICTM: The Interval Categorizer Tessellation-Based Model for High Performance Computing',
    '2004-01-01',
    1,
    'This paper presents the Interval Categorizer Tessellation-based Model (ICTM) for the simultaneous categorization of geographic regions considering several characteristics (e.g., relief, vegetation, land use etc.). Interval techniques are used for the modelling of uncertain data and the control of discretization errors. HPC-ICTM is an implementation of the model for clusters. We analyze the performance of the HPC-ICTM and present results concerning its application to the relief/land-use categorization of the region surrounding the lagoon Lagoa Pequena (RS, Brazil), which is extremely important from an ecological point of view.'
  ),
  (
    5,
    'Ontology-based feature-level sentiment analysis in Portuguese reviews',
    '2019-10-1',
    1,
    'Sentiment analysis is the field of study that analyses peoples opinions in texts. In the last decade, humans have come to share their opinions in social media on the web. Opinions are important because whenever we need to take a decision, we want to know others points of view. In this work we study this more detailed level of analysis, which is called the aspect-level. This more detailed type of analysis requires going deeper in the parts of a sentence and an effort to deal with their meaning, therefore knowledge rich approaches are useful. For that we use ontologies, as they can be used to represent the relevant aspects of entities, in a semantic organized way, for instance, aspects that are part-of or properties of an entity in a domain of knowledge. Our approach is built for Portuguese and is evaluated on a reviews data set of the accommodation sector.'
  );

-- insere dados na tabela autores
INSERT INTO
  autores (id_trab, autor)
VALUES
  (1, '1435405686437314'),
  (1, '1097468139544018'),
  (1, '9604735363839730'),
  (2, '3499616508280892'),
  (2, '3941460073542194'),
  (2, '9604735363839730'),
  (3, '4245960736253653'),
  (3, '1435405686437314'),
  (3, '7834818734456189'),
  (4, '4136234658803252'),
  (4, '7834818734456189'),
  (4, '3941460073542194'),
  (4, '1435405686437314');

-- insere dados na tabela apresentados
INSERT INTO
  apresentados (id_apresentado, nota, id_trab)
VALUES
  (1, 10, 1),
  (2, 8, 3);

-- insere dados na tabela publicados
INSERT INTO
  publicados (id_trab, qualis, periodico, doi)
VALUES
  (
    2,
    'A1',
    'IEEE',
    'https://link.springer.com/chapter/10.1007/978-3-030-43605-6_6'
  ),
  (
    3,
    'A1',
    'IEEE',
    'https://link.springer.com/article/10.1007/s11042-022-13094-6'
  ),
  (
    4,
    'A1',
    'IEEE',
    'https://link.springer.com/chapter/10.1007/11558958_10'
  ),
  (
    5,
    'A1',
    'IEEE',
    'https://www.inderscienceonline.com/doi/abs/10.1504/IJBIS.2019.102698'
  );