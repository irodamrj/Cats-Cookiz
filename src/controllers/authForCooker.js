const express = require('express');
const routes = express.Router();
const { attachCookiesToResponse } = require('../utils/jwt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Cooker = require('../models/cooker');
const { createCookerToken } = require('../utils/createToken');
const Adress = require('../models/address');

routes.post('/signup', async (req, res) => {
  const {
    email,
    password,
    username,
    phoneNumber,
    aboutCooker,
    openingHour,
    closingHour,
  } = req.body;
  let { address } = req.body;
  const emailAlreadyExists = await Cooker.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  if (!password || password.length < 6) {
    throw new CustomError.BadRequestError(
      'password cannot be null or less than 5 characters'
    );
  }
  const addressObject = await Adress.create(req.body.address);
  address = addressObject;
  const cooker = await Cooker.create({
    email,
    address,
    password,
    username,
    phoneNumber,
    aboutCooker,
    openingHour,
    closingHour,
  });
  console.log(cooker);
  const payload = createCookerToken(cooker);
  attachCookiesToResponse(res, payload);
  return res.send(cooker);
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const cooker = await Cooker.findOne({ email });
  if (!cooker) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordMatch = await cooker.comparePassword(password);
  if (!isPasswordMatch) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const payload = createCookerToken(cooker);
  attachCookiesToResponse(res, payload);
  res.send(cooker);
});

//logout route
routes.get('/logout', (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.send('logged out');
});

module.exports = routes;
