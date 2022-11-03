const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/testRoutes'));

// Rotas
app.use(function (req, res) {
  res.status(404);
});

// Servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`.green));
