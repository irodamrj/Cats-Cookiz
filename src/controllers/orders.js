const express = require('express');
const CustomerModel = require('../models/customer');
const CustomError = require('../errors');
const routes = express.Router();
const OrderModel = require('../models/order');
const { where } = require('../models/customer');
const CommentModel = require('../models/comment');
const CookerModel = require('../models/cooker');
const _ = require('lodash'); //to compare objects

routes.get('/all', async (req, res) => {
  const customer = await CustomerModel.findOne({ email: req.auth.email });
  const orders = await OrderModel.find({ customerId: customer.id })
    .populate('dishes')
    .populate('deliveryAddress');
  res.json(orders);

  throw new CustomError.InternalServerError('Internal server error');
});

routes.get('/:id', async (req, res) => {
  const orderId = req.params.id;
  const customer = await CustomerModel.findOne({ email: req.auth.email });

  const order = await OrderModel.findById(orderId)
    .populate('dishes')
    .populate('deliveryAddress');

  console.log(order.customerId);
  console.log(customer.id);

  if (!order) {
    throw new CustomError.BadRequestError('Order not found');
  }
  res.json(order);
  throw new CustomError.InternalServerError('Internal server error');
});

routes.post('/', async (req, res) => {
  const { dishes, deliveryAddress, expectedDeliveryTime } = req.body;
  const customerId = await CustomerModel.findOne({
    email: req.auth.email,
  }).select('_id');
  const order = new OrderModel({
    dishes,
    customerId,
    deliveryAddress,
    expectedDeliveryTime,
  });
  const populatedOrder = await OrderModel.populate(order, 'dishes');
  const cookerIds = populatedOrder.dishes
    .filter((item) => item.cookerId)
    .map((item) => item.cookerId);
  const areAllIdsSimilar =
    cookerIds.length > 0 &&
    cookerIds.every((id) => _.isEqual(id, cookerIds[0]));
  console.log(areAllIdsSimilar);
  if (!areAllIdsSimilar) {
    throw new CustomError.InternalServerError('Internal server error');
  }
  order.cookerId = cookerIds[0];
  const totalPrice = populatedOrder.dishes.reduce(
    (sum, dish) => sum + dish.price,
    0
  );

  order.totalAmount = totalPrice;

  const createdOrder = await order.save();

  res.json(createdOrder);

  throw new CustomError.InternalServerError('Internal server error');
});

routes.delete('/:id', async (req, res) => {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new CustomError.BadRequestError('Order not found');
  }
  await OrderModel.deleteOne({ _id: orderId });
  res.json('Order deleted successfully');
  throw new CustomError.InternalServerError('Internal server error');
});
routes.post('/:id/review', async (req, res) => {
  const { rating, commentText } = req.body;
  const orderId = req.params.id;
  const customerId = await CustomerModel.findOne({
    email: req.auth.email,
  }).select('_id');
  const order = await OrderModel.findById(orderId).select('cookerId');
  console.log(order.cookerId);
  const comment = await CommentModel.create({
    customerId: customerId,
    cookerId: order.cookerId,
    rating: rating,
    commentText: commentText,
  });
  const cooker = await CookerModel.findById(order.cookerId);
  console.log(cooker);

  cooker.comments.push(comment);
  await cooker.save();
  const createdComment = await comment.save();
  res.json(createdComment);

  throw new CustomError.InternalServerError('Internal server error');
});
module.exports = routes;
