const express = require('express');
const routes = express.Router();
const { attachCookiesToResponse } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Cooker = require('../models/customer');
const { createCookerToken } = require('../utils/createToken');

routes.post('/signup', async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    phoneNumber,
    aboutCooker,
    openingHour,
    closingHour,
  } = req.body;
  const emailAlreadyExists = await Cooker.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  if (!password || password.length < 6) {
    throw new CustomError.BadRequestError(
      'password cannot be null or less than 5 characters'
    );
  }
  const cooker = await Cooker.create({
    username,
    email,
    password,
    address,
    phoneNumber,
    aboutCooker,
    openingHour,
    closingHour,
  });
  const payload = createCookerToken(cooker);
  attachCookiesToResponse(res, payload);
  return res.redirect('/');
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!username || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const cooker = await Cooker.findOne({ email });
  if (!cooker) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordMatch = await Cooker.comparePassword(password);
  if (!isPasswordMatch) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const payload = createCookerToken(cooker);
  attachCookiesToResponse(res, payload);
});

//logout route
routes.get('/logout', (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.end();
});

module.exports = routes;
