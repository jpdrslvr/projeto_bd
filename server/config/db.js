var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log(`Conectado a BD ${DBSOURCE.yellow}`);
    db.run(
      `CREATE TABLE test (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            col1 CHAR(5)
            )`,
      (err) => {
        if (!err) {
          // Table just created, creating some rows
          db.run('INSERT INTO test (col1) VALUES (?)', ['a']);
        }
      }
    );
  }
});

module.exports = db;
