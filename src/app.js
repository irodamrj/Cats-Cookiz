require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require('express-jwt');
const passport = require('passport');
const morgan = require('morgan');
const passportSetup = require('./config/passport');

//database
const db = require('./db');

//route middleware
const authCustomerRoute = require('./controllers/authForCustomer');
const authCookerRoute = require('./controllers/authForCooker');

app.use(morgan('tiny'));

app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));

app.use(
  '/api',
  jwt({
    secret: process.env.SECRET_KEY, // secret key is always required
    algorithms: ['HS256'], // encryption algorithm is always required
    requestProperty: 'auth', // This ensures that decoded token details will be available on req.auth else req.user is the default.
    getToken: (req) => req.signedCookies['token'] ?? req.cookies['token'],
  }).unless({
    path: [
      '/api/auth/customer/google',
      '/api/auth/customer/google/callback',
      '/api/auth/customer/facebook',
      '/api/auth/customer/facebook/callback',
      '/api/auth/customer/signup',
      '/api/auth/customer/login',
      '/api/auth/cooker/signup',
      '/api/auth/cooker/login',
    ],
  })
);

//routes
app.use('/api/auth/customer', authCustomerRoute);
app.use('/api/auth/cooker', authCookerRoute);

const port = 5000;
console.log(process.env.PORT);

const PROXY_PORT = process.env.PROXY_PORT ?? port;
if (!port && process.env.NODE_ENV !== 'test') {
  console.error('A port have to be specified in environment variable PORT');
  process.exit(1);
}

if (process.env.NODE_ENV !== 'test') {
  db.connect().then(() => {
    console.info('Connected to db');
  });
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API Server started on port ${port}`);
    console.log(
      `Proxy server started on port ${PROXY_PORT}. Head to http://localhost:${PROXY_PORT} and start hacking.`
    );
  });
}

module.exports = app;
