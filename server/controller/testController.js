const asyncHandler = require('express-async-handler');
var db = require('../config/db');

// @desc   Get test
// @route  GET /test
// @access Public
const get = asyncHandler(async (req, res) => {
  db.all('SELECT * FROM test', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

const insert = asyncHandler(async (req, res) => {
  const { value } = req.query;

  db.run('INSERT INTO test (col1) VALUES (?)', [value]);

  res.status(200).json({ message: 'ok' });
});

module.exports = {
  get,
  insert,
};
