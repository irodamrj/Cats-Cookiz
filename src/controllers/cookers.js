const express = require('express');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { isCookerApproved } = require('../middleware/authorization');
const Cooker = require('../models/cooker');
const Order = require('../models/order');
const Dish = require('../models/dish');
const Address = require('../models/address');

const router = express.Router();

router.get('/', async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }).populate(
    'address'
  );
  return res.send(cooker);
});

router.patch('/', async (req, res) => {
  const { phonenumber, aboutCooker, openingHour, closingHour, address } =
    req.body;

  const cookerAddressId = await Cooker.findOne(
    { email: req.auth.email },
    { address: 1, _id: 0 }
  );

  let newAddress;
  if (address) {
    newAddress = await Address.findOneAndUpdate(
      {
        _id: cookerAddressId.address,
      },
      address
    );
    console.log('updated');
  }

  const updatedCooker = await Cooker.findOneAndUpdate(
    { email: req.auth.email },
    { phonenumber, aboutCooker, openingHour, closingHour },
    { new: true }
  ).populate('address');

  return res
    .status(StatusCodes.OK)
    .send(updatedCooker + ' is updated successfully');
});

router.get('/orders', async (req, res) => {

  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const orders = await Order.find({ cookerId: cooker._id }).populate([
    { path: 'dishes', model: 'Dish' },
    { path: 'deliveryAddress', model: 'Address' },
  ]);

  return res.status(StatusCodes.OK).send(orders);
});

router.get('/orders/:id', async (req, res) => {
  const orderId = req.params.id;

  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const order = await Order.findOne({
    _id: orderId,
    cookerId: cooker._id,
  }).populate([
    { path: 'dishes', model: 'Dish' },
    { path: 'deliveryAddress', model: 'Address' },
  ]);

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }
  return res.status(StatusCodes.OK).send(order);
});

router.patch('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const orderStatus = req.body.orderStatus;

  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const order = await Order.findOne({
    _id: orderId,
    cookerId: cooker._id,
  }).populate([
    { path: 'dishes', model: 'Dish' },
    { path: 'deliveryAddress', model: 'Address' },
  ]);

  if (!order) {
    throw new CustomError.NotFoundError(`Order with Id ${orderId} not found`);
  }

  await Order.findByIdAndUpdate(
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

router.delete('/dishes/:id', async (req, res) => {
  const dishId = req.params.id;
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const dish = await Dish.findOneAndDelete({ cookerId: cooker, _id: dishId });

  if (!dish) {
    throw new CustomError.NotFoundError(`Dish with Id ${dishId} not found`);
  }

  return res.status(StatusCodes.OK).send(dish + ' is deleted successfully');
});

router.get('/dishes', async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });

  const dishes = await Dish.find({ cookerId: cooker });
  return res.status(StatusCodes.OK).send(dishes);
});

router.patch('/dishes/:id', async (req, res) => {
  const dishId = req.params.id;
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const { name, description, price, image } = req.body;
  const dish = await Dish.findOneAndUpdate(
    { cookerId: cooker, _id: dishId },
    { name, description, price, image },
    { new: true }
  );
  if (!dish) {
    throw new CustomError.NotFoundError('Dish not found');
  }
  return res.status(StatusCodes.OK).send(dish + ' is updated successfully');
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
