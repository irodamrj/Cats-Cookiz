const express = require('express');
const router = express.Router();
const CustomerModel = require("../models/customer");
const CookModel = require('../models/cooker');
const OrderModel = require('../models/order');
const CommentModel = require('../models/comment');
const AddressModel = require('../models/address');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

router.delete('/cooker/:id', async (req, res) => {
  const { id } = req.params;
  const cook = await CookModel.findByIdAndDelete(id).populate('address');
  if (!cook) {
    throw new Error('Cook not found');
  }
  await CommentModel.deleteMany({ cookerId : id });
  if (cook.address) {
    await AddressModel.findByIdAndDelete(cook.address._id);
  }
  await OrderModel.deleteMany({ cookerId: id });
  return res.status(StatusCodes.OK).send('Cooker deleted successfully');
});

router.delete('/customer/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const customer = await CustomerModel.findOneAndUpdate(
    { _id: id },
    { $unset: { cart: 1 } },
  ).populate('address');
  if (!customer) {
    throw new CustomError.BadRequestError('Customer nor found');
}
  if (customer.address) {
    await AddressModel.findByIdAndDelete(customer.address._id);
  }
  await OrderModel.deleteMany({ customerId: id });
  await CustomerModel.findByIdAndDelete(id);

  res.clearCookie('token', {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 14 * 1000,
  });
  return res.status(StatusCodes.OK).send('Customer deleted successfully');
  
});

router.patch('/order/:id', async (req, res) => {
    const orderId = req.params.id;
    const orderStatus = req.body.orderStatus;
  
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      { status: orderStatus },
      { new: true }
    );
  
    return res
      .status(StatusCodes.OK)
      .send(
        `status of the order with Id ${orderId} is updated to ${orderStatus}`
      );
  });

module.exports = router;