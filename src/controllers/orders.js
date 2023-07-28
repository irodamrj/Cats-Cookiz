const CustomerModel = require('../models/customer');
const CustomError = require('../errors');
const OrderModel = require('../models/order');
const CommentModel = require('../models/comment');
const CookerModel = require('../models/cooker');
const Dish = require('../models/dish');
const Address = require('../models/address');
const { StatusCodes } = require('http-status-codes');

const getAllOrders = async (req, res) => {
  const customerId = await CustomerModel.findOne(
    { email: req.auth.email },
    { _id: 1 }
  );
  const orders = await OrderModel.find({ customerId: customerId })
    .populate('dishes')
    .populate('deliveryAddress');

  return res.status(StatusCodes.OK).json(orders);
};

const getAnOrder = async (req, res) => {
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
  return res.status(StatusCodes.OK).json({ order });
};

const createOrder = async (req, res) => {
  let { deliveryAddress } = req.body;
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

  await CustomerModel.findOneAndUpdate(
    { email: customer.email },
    {
      'cart.itemId': [],
      'cart.total': 0,
    },
    { new: true }
  );

  return res.status(StatusCodes.CREATED).json({ order });
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const customerId = await CustomerModel.findOne(
    { email: req.auth.email },
    { _id: 1 }
  );
  const order = await OrderModel.findOneAndUpdate(
    {
      _id: orderId,
      customerId: customerId,
      status: 'Completed',
    },
    { status: 'Cancelled' },
    { new: true }
  );

  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  if (order.isAddressNew) {
    await Address.findOneAndDelete({ _id: order.deliveryAddress });
  }
  return res.status(StatusCodes.OK).json('Order cancelled successfully');
};

const createComment = async (req, res) => {
  const { rating, commentText } = req.body;
  const orderId = req.params.id;
  const customerId = await CustomerModel.findOne(
    {
      email: req.auth.email,
    },
    { _id: 1 }
  );
  const order = await OrderModel.findOne(
    {
      _id: orderId,
      customerId: customerId._id,
    },
    { cookerId: 1, _id: 0 }
  );

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

  const comments = await CommentModel.find({ cookerId: cooker._id });

  let averageRating = 0;
  let sumOfRatings = 0;
  if (comments.length > 0) {
    for (let i = 0; i < comments.length; i++) {
      sumOfRatings += comments[i].rating;
    }

    averageRating = (sumOfRatings / comments.length).toFixed(1);
    cooker.averageRating = averageRating;
    await cooker.save();
  }

  return res.status(StatusCodes.OK).json({ comment });
};

module.exports = {
  getAllOrders,
  getAnOrder,
  createOrder,
  cancelOrder,
  createComment,
};
