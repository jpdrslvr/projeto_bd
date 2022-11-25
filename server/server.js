const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const bodyParser = require('body-parser');
const { con, query } = require('./config/db');
const path = require('path');

const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas
app.use('/api/pesquisadores', require('./routes/pesquisadoresRoutes'));
app.use('/api/pesquisas', require('./routes/pesquisasRoutes'));
app.use('/api/trabalhos', require('./routes/trabalhosRoutes'));

if (process.env.NODE_ENV === 'production') {
  console.log(path.join(__dirname, '../client/build'));

  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Mude NODE_ENV para production.'));
}

// Servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`.green));
