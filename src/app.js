const express = require('express');
const apiRoutes = require('./routes');
const db = require('./db');
//const User=require("./models/User");

const cookieParser = require('cookie-parser');
const passport = require('passport');

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

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.use(cookieParser());

app.use(passport.initialize());

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API Server started on port ${port}`);
    console.log(
      `Proxy server started on port ${PROXY_PORT}. Head to http://localhost:${PROXY_PORT} and start hacking.`
    );
  });
}

module.exports = app;
