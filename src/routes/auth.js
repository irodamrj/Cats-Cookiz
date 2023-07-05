const express = require('express');
const routes = express.Router();
const authController = require('../controllers/auth');
routes.use('/auth', authController);
module.exports = routes;
