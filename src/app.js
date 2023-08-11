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
const swaggerDocs = require('./SwaggerDocs/swaggerdoc');
const swaggerUi = require('swagger-ui-express');

//database
const db = require('./db');

// Auth routes
const authCustomerRoute = require('./routes/authForCustomer.js');
const authCookerRoute = require('./routes/authForCooker');
const authForAdmin = require('./routes/authForAdmin');
//routes
const customerRoute = require('./routes/customers');
const orderRoute = require('./routes/orders');
const adminRoute = require('./routes/admin');
const cookerRoute = require('./routes/cookers');
const publicRoute = require('./routes/public');

db.connect();

//Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//middlewares
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const {
  cookerAuth,
  customerAuth,
  adminAuth,
} = require('./middleware/authorization');

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
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
app.use(function (err, req, res, next) {
  console.log(`test ${req.originalUrl}`)

  if (err.name === 'UnauthorizedError') {
    if (req.originalUrl.includes('admin')) {
      return res.redirect('/api/auth/admin/login');
    } else if (req.originalUrl.includes('customer')) {
      return res.redirect('/api/auth/customer/login');
    } else {
      return res.redirect('/api/auth/cooker/login');
    }
  } else {
    next(err);
  }
});

//routes
app.use('/api/auth/customer', authCustomerRoute);
app.use('/api/auth/cooker', authCookerRoute);
app.use('/api/auth/admin', authForAdmin);
app.use('/api/customer', customerAuth, customerRoute);
app.use('/api/admin', adminAuth, adminRoute);
app.use('/api/cooker', cookerAuth, cookerRoute);
app.use('/api/customer/order', customerAuth, orderRoute);
app.use('/home', publicRoute);

app.use(notFoundMiddleware);

const port = 5000;

const PROXY_PORT = process.env.PROXY_PORT ?? port;
if (!port && process.env.NODE_ENV !== 'test') {
  console.error('A port have to be specified in environment variable PORT');
  process.exit(1);
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
