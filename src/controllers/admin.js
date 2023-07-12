const express = require('express');
const router = express.Router();
const CustomerModel = require("../models/customer");
const CookModel = require('../models/cooker');
const OrderModel = require('../models/order');
const CommentModel = require('../models/comment');
const AddressModel = require('../models/address');

// // GET route for the root path '/'
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// DELETE /admin/cook/:id
router.delete('/cook/:id', async (req, res) => {
  const { id } = req.params;

  // Find the cook and retrieve their address
  const cook = await CookModel.findById(id).populate('address');
  if (!cook) {
    throw new Error('Cook not found');
  }

  // Delete the comments associated with the cook
  await CommentModel.deleteMany({ cook: id });

  // Delete the cook's address if it exists
  if (cook.address) {
    await AddressModel.findByIdAndDelete(cook.address._id);
  }

  // Delete the cook's profile
  await CookModel.findByIdAndDelete(id);

  res.json({ message: 'Cook and associated address/comments deleted successfully' });
});
// DELETE /admin/user/:id
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  // Find the customer and retrieve their address
  const customer = await CustomerModel.findById(id).populate('address');
  if (!customer) {
    throw new Error('Customer not found');
  }

  // Delete the customer's address if it exists
  if (customer.address) {
    await AddressModel.findByIdAndDelete(customer.address._id);
  }

  // Delete the customer's profile
  await CustomerModel.findByIdAndDelete(id);

  res.json({ message: 'Customer and associated address deleted successfully' });
});

module.exports = router;