const express = require('express');
const router = express.Router();
const passport = require('passport');
const { attachCookiesToResponse } = require('../utils/jwt');
const { createUserToken } = require('../utils/createToken');
const { StatusCodes } = require('http-status-codes');

const checkCookie = require('../middleware/checkCookie');
const { customerAuth } = require('../middleware/authorization');
const { signup, login, logout } = require('../controllers/authForCustomer');
const sendEmail = require('../utils/sendEmail');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  async (req, res) => {
    const payload = createUserToken(req.user);
    attachCookiesToResponse(res, payload);
    sendEmail(req.user.email, 'customer');
    return res.status(StatusCodes.OK).json(req.user);
  }
);
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    console.log(req);
    const payload = createUserToken(req.user);
    attachCookiesToResponse(res, payload);
    sendEmail(req.user.email, 'customer');
    return res.status(StatusCodes.OK).json(req.user);
  }
);
router.post('/signup', checkCookie, signup);
router.post('/login', checkCookie, login);
router.get('/logout', customerAuth, logout);

module.exports = router;
