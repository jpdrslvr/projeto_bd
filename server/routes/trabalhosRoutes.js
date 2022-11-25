const express = require('express');
const {
  getTrabalhos,
  getFiltersTrabalhos,
} = require('../controller/controller');

const router = express.Router();

router.route('/').get(getTrabalhos);
router.route('/getFilters').get(getFiltersTrabalhos);

module.exports = router;
