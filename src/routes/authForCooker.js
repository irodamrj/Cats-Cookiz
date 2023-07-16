const express = require('express');
const routes = express.Router();

const checkCookie = require('../middleware/checkCookie');
const { cookerAuth } = require('../middleware/authorization');
const { signup, login, logout } = require('../controllers/authForCooker');

routes.post('/signup', checkCookie, signup);
routes.post('/login', checkCookie, login);
routes.get('/logout', cookerAuth, logout);

module.exports = routes;
