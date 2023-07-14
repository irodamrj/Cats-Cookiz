const passport = require('passport');
const { attachCookiesToResponse } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const { createUserToken } = require('../utils/createToken');

//Google authentication page route

const google = function () {
  passport.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  });
};

const googleCallbackFunc = async (req, res) => {
  const payload = createUserToken(req.user);
  console.log(payload);
  attachCookiesToResponse(res, payload);
  return res.status(StatusCodes.OK).json(req.user);
};
//facebook authentication page route

const facebook = function () {
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] });
};

const facebookCb = function (req, res) {
  // Successful authentication, redirect home.
  const payload = createUserToken(req.user);
  attachCookiesToResponse(res, payload);
};
//local signup
const signup = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

//logout route
const logout = (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.status(StatusCodes.OK).json('Customer logged out');
};

module.exports = {
  google,
  googleCallbackFunc,
  facebook,
  facebookCb,
  signup,
  login,
  logout,
};
