const express = require('express');
const router = express.Router();

const checkCookie = require('../middleware/checkCookie');
const { customerAuth } = require('../middleware/authorization');
const {
  google,
  googleCallback,
  googleCallbackFunc,
  facebook,
  facebookCallback,
  facebookCb,
  signup,
  login,
  logout,
} = require('../controllers/authForCustomer');

router.get('/google', google);
router.get('/google/callback', googleCallback, googleCallbackFunc);
router.get('/facebook', facebook);
router.get('/facebook/callback', facebookCallback, facebookCb);
router.post('/signup', checkCookie, signup);
router.post('/login', checkCookie, login);
router.get('/logout', customerAuth, logout);

module.exports = router;
