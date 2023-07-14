const express = require('express');
const router = express.Router();
const passport = require('passport');

const checkCookie = require('../middleware/checkCookie');
const { customerAuth } = require('../middleware/authorization');
const {
  google,
  googleCallbackFunc,
  facebook,
  facebookCb,
  signup,
  login,
  logout,
} = require('../controllers/authForCustomer');

router.get('/google', google);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  googleCallbackFunc
);
router.get('/facebook', facebook);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookCb
);
router.post('/signup', checkCookie, signup);
router.post('/login', checkCookie, login);
router.get('/logout', customerAuth, logout);

module.exports = router;
