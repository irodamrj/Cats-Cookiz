const express = require('express');
const routes = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Google authentication page route
routes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  })
);

//google callback route
routes.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),

  function (req, res) {
    // console.log('no failure');
    const payload = {
      name: req.user.name,
      email: req.user.email,
      providerId: req.user.providerId,
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 1209600,
      avatar: req.user.profilePicture,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie('jwt', token, {
      maxAge: 14 * 24 * 3600 * 1000,
      signed: true,
      httpOnly: true,
    });
    res.redirect('/');
  }
);

routes.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

routes.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    const payload = {
      name: req.user.name,
      email: req.user.email,
      providerId: req.user.providerId,
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 1209600,
      avatar: req.user.profilePicture,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie('jwt', token, {
      maxAge: 14 * 24 * 3600 * 1000,
      signed: true,
      httpOnly: true,
    });
    res.redirect('/');
  }
);

//logout route
routes.get('/logout', (req, res) => {
  res.clearCookie('jwt', { signed: true, httpOnly: true });
  res.end();
});

module.exports = routes;
