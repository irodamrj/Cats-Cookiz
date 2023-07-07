const express = require('express');

const passport = require('passport');
const { attachCookiesToResponse } = require('./utils/jwt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./errors');
const Customer = require('./models/customer');
const { createUserToken } = require('./utils/createToken');
//Customer authentication
const router = express.Router();

router.post('signup', async (req, res) => {
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
  const customer = await Customer.create({
    firstName,
    lastName,
    email,
    password,
  });
  const payload = createUserToken(customer);
  attachCookiesToResponse(res, payload);
  return res.send(payload);
});

router.get('hello', async (req, res) => {
  res.send('here dummy get');
});

module.exports = router;
