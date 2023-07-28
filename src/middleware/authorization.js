const Cooker = require('../models/cooker');
const Customer = require('../models/customer');
const Admin = require('../models/admin');
const CustomError = require('../errors/index');

const cookerAuth = async (req, res, next) => {
  const cooker = await Cooker.findOne({ email: req.auth.email });
  if (cooker) {
    next();
  } else {
    return res.redirect('/api/auth/cooker/login');
  }
};

const isCookerApproved = async (req, res, next) => {
  const cooker = await Cooker.findOne({ email: req.auth.email });
  if (cooker.status === 'Approved') {
    next();
  } else {
    throw new CustomError.UnauthorizedError(
      'You are not authorized to reach this endpoint, please add a payment type "card" to make your account approved'
    );
  }
};

const customerAuth = async (req, res, next) => {
  const customer = await Customer.findOne({ email: req.auth.email });
  if (customer) {
    next();
  } else {
    return res.redirect('/api/auth/customer/login');
  }
};

const adminAuth = async (req, res, next) => {
  const admin = await Admin.findOne({ username: req.auth.username });
  if (admin) {
    next();
  } else {
    return res.redirect('/api/auth/admin/login');
  }
};

module.exports = { cookerAuth, customerAuth, isCookerApproved, adminAuth };
