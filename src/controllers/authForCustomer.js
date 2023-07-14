const express = require('express');

const passport = require('passport');
const { attachCookiesToResponse } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
// const Cart = require('../models/cart');

const { createUserToken } = require('../utils/createToken');
const checkCookie = require('../middleware/checkCookie');
const { customerAuth } = require('../middleware/authorization');
//Customer authentication
const router = express.Router();

//Google authentication page route
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  })
);

//google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),

  async (req, res) => {
    // console.log('no failure');
    const payload = createUserToken(req.user);
    console.log(payload);
    attachCookiesToResponse(res, payload);
    return res.status(StatusCodes.OK).json(req.user);
  }
);

//facebook authentication page route
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

//facebook callback route
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    const payload = createUserToken(req.user);
    attachCookiesToResponse(res, payload);
  }
);

//local signup
router.post('/signup', checkCookie, async (req, res) => {
  console.log('signup called');
  const { firstName, lastName, email, password } = req.body;
  const emailAlreadyExists = await Customer.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  if (!password || password.length < 6) {
    throw new CustomError.BadRequestError(
      'password cannot be null or less than 6 characters'
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const customer = await Customer.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashed,
  });
  const payload = createUserToken(customer);
  attachCookiesToResponse(res, payload);
  return res.status(StatusCodes.OK).json({ customer });
});

router.post('/login', checkCookie, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const customer = await Customer.findOne({ email });

  if (!customer) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials second');
  }

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials second');
  }

  const payload = createUserToken(customer);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).json({ customer });
});

//logout route
router.get('/logout', customerAuth, (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.status(StatusCodes.OK).json('Customer logged out');
});

module.exports = router;
