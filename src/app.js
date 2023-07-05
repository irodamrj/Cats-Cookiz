require('express-async-errors');
const express = require('express');
const apiRoutes = require('./routes');
const db = require('./db');
const passportSetup = require('./config/passport');
//const User=require("./models/User");
const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require('express-jwt');
const passport = require('passport');
const notFoundMiddleware = require('./middleware/not-found');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(
  '/api',
  jwt({
    secret: process.env.SECRET_KEY, // secret key is always required
    algorithms: ['HS256'], // encryption algorithm is always required
    requestProperty: 'auth', // This ensures that decoded token details will be available on req.auth else req.user is the default.
    getToken: (req) => req.signedCookies['jwt'] ?? req.cookies['jwt'],
  }).unless({
    path: [
      '/api/auth/google',
      '/api/auth/google/callback',
      '/api/auth/facebook',
      '/api/auth/facebook/callback',
    ],
  })
);

app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('homepage');
});
app.use('/api', apiRoutes);




app.use(notFoundMiddleware);

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
