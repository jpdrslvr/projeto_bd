const mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'pesquisa',
});

con.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + con.threadId);
});

const query = util.promisify(con.query).bind(con);

module.exports = { con, query };
