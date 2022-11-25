const express = require('express');
const {
  getPesquisas,
  getFiltersPesquisas,
} = require('../controller/controller');

const router = express.Router();

router.route('/').get(getPesquisas);
router.route('/getFilters').get(getFiltersPesquisas);

module.exports = router;
