const { attachCookiesToResponse } = require('../utils/jwt');
const { createAdminToken } = require('../utils/createToken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Admin = require('../models/admin');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = password === admin.password;
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const payload = createAdminToken(admin);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).json(admin.username);
};

//logout route
const logout = async (req, res) => {
  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  res.status(StatusCodes.OK).json('Admin logged out');
};

module.exports = { login, logout };
