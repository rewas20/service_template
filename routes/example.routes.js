
const express = require('express');
const router = express.Router();
const controller = require('../controllers/example.controller');

router.get('/hello', middleware, controller.hello);

module.exports = router;