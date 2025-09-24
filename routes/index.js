const routes = require('express').Router();

const baseController = require('../controllers/index');

routes.get('/', baseController.getName);

module.exports = routes;


const express = require('express');
const router = express.Router();

router.use('/contact', require('./contact'));

module.exports = router;
