const express = require('express');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { isCookerApproved } = require('../middleware/authorization');
const Cooker = require('../models/cooker');
const Order = require('../models/order');
const Dish = require('../models/dish');

const router = express.Router();

router.get('/', async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }).populate(
    'address'
  );
  return res.send(cooker);
});

router.get('/orders', async (req, res) => {
  const cookerId = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const orders = await Order.find({
    'dishes.cookerId': { $elemMatch: { cookerId } },
  }).populate('dishes');
  return res.status(StatusCodes.OK).send(orders);
});

router.post('/dishes', isCookerApproved, async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const { name, description, price } = req.body;
  let image = req.body.image || '';
  const newDish = await Dish.create({
    name: name,
    price: price,
    description: description,
    image: image,
    cookerId: cooker,
  });
  return res.status(StatusCodes.OK).send(newDish);
});

router.get('/dishes', async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const dishes = await Dish.find(
    { cookerId: cooker },
    { name: 1, description: 1, price: 1, image: 1, _id: 0, cookerId: 1 }
  );
  return res.status(StatusCodes.OK).send(dishes);
});

router.post('/paymentType', async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email });
  cooker.addPaymentMethod(req.body.paymentType);
  cooker.save();

  return res
    .status(StatusCodes.OK)
    .send(
      `payment type ${req.body.paymentType} added. Current payment options are: ${cooker.paymentType}`
    );
});

module.exports = router;
