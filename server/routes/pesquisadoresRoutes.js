const express = require('express');
const {
  getPesquisadores,
  getFiltersPesquisadores,
} = require('../controller/controller');

const router = express.Router();

router.route('/').get(getPesquisadores);
router.route('/getFilters').get(getFiltersPesquisadores);

module.exports = router;
