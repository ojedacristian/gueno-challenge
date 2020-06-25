const express = require('express');
const router = express.Router();

const Controller = require('../controllers/index');

router.post('/procesar', Controller.procesar)

router.get('/', Controller.index);

module.exports = router;