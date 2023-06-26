const express = require('express');
const routes = express.Router();
const authRoutes = require('./auth');

routes.use('/auth', authRoutes);
module.exports = routes;
