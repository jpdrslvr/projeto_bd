const express = require('express');
const { get, insert } = require('../controller/testController');

const router = express.Router();

router.route('/').get(get);
router.route('/insert').get(insert);

module.exports = router;
