const express = require('express');
const router = express.Router();
const { attachCookiesToResponse } = require('../utils/jwt');
const { createCookerToken } = require('../utils/createToken');
const checkCookie = require('../middleware/checkCookie');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Admin = require('../models/admin');

router.post('/login', checkCookie, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const admin = await Admin.findOne({ email });

  if (!customer) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const payload = createCookerToken(admin);
  attachCookiesToResponse(res, payload);
  res.send(admin);
});

//logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.send('Admin logged out');
});

module.exports = router;
