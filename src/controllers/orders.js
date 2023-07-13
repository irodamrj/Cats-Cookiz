const express = require('express');
const CustomerModel = require('../models/customer');
const CustomError = require('../errors');
const routes = express.Router();
const OrderModel = require('../models/order');
const CommentModel = require('../models/comment');
const CookerModel = require('../models/cooker');
const Dish = require('../models/dish');
const Address = require('../models/address');
const { StatusCodes } = require('http-status-codes');

routes.get('/all', async (req, res) => {
  const customerId = await CustomerModel.findOne(
    { email: req.auth.email },
    { _id: 1 }
  );
  const orders = await OrderModel.find({ customerId: customerId })
    .populate('dishes')
    .populate('deliveryAddress');

  return res.status(StatusCodes.OK).json(orders);
});

routes.get('/:id', async (req, res) => {
  const orderId = req.params.id;
  const customerId = await CustomerModel.findOne(
    { email: req.auth.email },
    { _id: 1 }
  );

  const order = await OrderModel.findOne({
    _id: orderId,
    customerId: customerId,
  })
    .populate('dishes')
    .populate('deliveryAddress');

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }
  return res.status(StatusCodes.OK).json(order);
});

routes.post('/', async (req, res) => {
  let { deliveryAddress } = req.body;
  console.log('from body ' + deliveryAddress);
  const customer = await CustomerModel.findOne({
    email: req.auth.email,
  });

  const cartItemIds = customer.cart.itemId;

  if (!cartItemIds || cartItemIds.length < 1) {
    throw new CustomError.BadRequestError('Order cannot be empty');
  }

  const dish = await Dish.findOne({ _id: cartItemIds[0] }, { cookerId: 1 });
  let isAddressNew = false;
  if (!deliveryAddress) {
    if (!customer.address) {
      throw new CustomError.BadRequestError(
        'Delivery address cannot be empty. Provide it or update address property'
      );
    }
    deliveryAddress = customer.address;
  } else {
    deliveryAddress = await Address.create(deliveryAddress);
    isAddressNew = true;
  }

  const itemLength = cartItemIds.length;

  const expectedDeliveryTime =
    itemLength <= 2
      ? '30 Minutes'
      : itemLength <= 4
      ? '45 Minutes'
      : '60 Minutes';

  const totalAmount = customer.cart.total;

  const order = await OrderModel.create({
    dishes: cartItemIds,
    customerId: customer._id,
    deliveryAddress: deliveryAddress,
    expectedDeliveryTime: expectedDeliveryTime,
    totalAmount: totalAmount,
    cookerId: dish.cookerId,
    isAddressNew: isAddressNew,
  });

  const customerToUpdate = await CustomerModel.findOneAndUpdate(
    { email: customer.email },
    {
      'cart.itemId': [],
      'cart.total': 0,
    },
    { new: true }
  );

  return res.status(StatusCodes.CREATED).send(order);

  // const order = new OrderModel({
  //   dishes,
  //   customerId,
  //   deliveryAddress,
  //   expectedDeliveryTime,
  // });
  // const populatedOrder = await OrderModel.populate(order, 'dishes');
  // const cookerIds = populatedOrder.dishes
  //   .filter((item) => item.cookerId)
  //   .map((item) => item.cookerId);
  // const areAllIdsSimilar =
  //   cookerIds.length > 0 &&
  //   cookerIds.every((id) => _.isEqual(id, cookerIds[0]));
  // console.log(areAllIdsSimilar);
  // if (!areAllIdsSimilar) {
  //   throw new CustomError.InternalServerError('Internal server error');
  // }
  // order.cookerId = cookerIds[0];
  // const totalPrice = populatedOrder.dishes.reduce(
  //   (sum, dish) => sum + dish.price,
  //   0
  // );

  // order.totalAmount = totalPrice;

  // const createdOrder = await order.save();

  // res.json(createdOrder);
});

routes.delete('/:id', async (req, res) => {
  const orderId = req.params.id;
  const customerId = await CustomerModel.findOne(
    { email: req.auth.email },
    { _id: 1 }
  );
  const order = await OrderModel.findOneAndDelete({
    _id: orderId,
    customerId: customerId,
  });

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  if (order.isAddressNew) {
    await Address.findOneAndDelete({ _id: order.deliveryAddress });
  }
  return res.status(StatusCodes.OK).json('Order deleted successfully');
});

routes.post('/:id/review', async (req, res) => {
  const { rating, commentText } = req.body;
  const orderId = req.params.id;
  console.log(orderId);
  const customerId = await CustomerModel.findOne(
    {
      email: req.auth.email,
    },
    { _id: 1 }
  );
  console.log(customerId._id);
  const order = await OrderModel.findOne(
    {
      _id: orderId,
      customerId: customerId._id,
    },
    { cookerId: 1, _id: 0 }
  );
  console.log(order);

  if (!order) {
    throw new CustomError.NotFoundError(`Order with id ${orderId} not found`);
  }

  const cooker = await CookerModel.findById(order.cookerId);

  if (!cooker) {
    throw new CustomError.NotFoundError(
      `Cooker with id ${cooker._id} not found`
    );
  }

  const comment = await CommentModel.create({
    customerId: customerId,
    cookerId: cooker._id,
    rating: rating,
    commentText: commentText,
  });

  cooker.comments.push(comment);
  await cooker.save();
  // const createdComment = await comment.save();
  return res.status(StatusCodes.OK).json(comment);
});
module.exports = routes;
