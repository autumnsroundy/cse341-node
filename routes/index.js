const routes = require('express').Router();

const baseController = require('../controllers/index');

routes.get('/', baseController.getName);

module.exports = routes;