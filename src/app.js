require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//packages
const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require('express-jwt');
const passport = require('passport');
const morgan = require('morgan');
const passportSetup = require('./config/passport');

//database
const db = require('./db');

//routes
const authCustomerRoute = require('./controllers/authForCustomer');
const authCookerRoute = require('./controllers/authForCooker');
const customerRoute = require('./controllers/customers');
const authForAdmin = require('./controllers/authForAdmin');
const orderRoute = require('./controllers/orders');
const adminRoute = require('./controllers/admin');
const cookerRoute = require('./controllers/cookers');
const public = require('./controllers/publicRoutes/public');

//middlewares
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const {
  cookerAuth,
  customerAuth,
  adminAuth,
} = require('./middleware/authorization');

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
      '/api/auth/admin/login',
    ],
  })
);

//routes
app.use('/api/auth/customer', authCustomerRoute);
app.use('/api/order', orderRoute);
app.use('/api/auth/cooker', authCookerRoute);
app.use('/api/customer', customerRoute);
app.use('/api/auth/admin', authForAdmin);
app.use('/api/admin', adminRoute);

app.use('/api/cooker', cookerAuth, cookerRoute);
app.use('/home', public);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
