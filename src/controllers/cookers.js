const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Cooker = require('../models/cooker');
const Order = require('../models/order');
const Dish = require('../models/dish');
const Address = require('../models/address');

const getProfile = async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }).populate(
    'address'
  );
  return res.status(StatusCodes.OK).json({ cooker });
};

const updateProfile = async (req, res) => {
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
  }

  const updatedCooker = await Cooker.findOneAndUpdate(
    { email: req.auth.email },
    { phonenumber, aboutCooker, openingHour, closingHour },
    { new: true }
  );

  return res.status(StatusCodes.OK).json(updatedCooker);
};

const getAllOrders = async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const orders = await Order.find({ cookerId: cooker._id }).populate([
    { path: 'dishes', model: 'Dish' },
    { path: 'deliveryAddress', model: 'Address' },
  ]);

  return res.status(StatusCodes.OK).json({ orders });
};

const getAnOrder = async (req, res) => {
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
  return res.status(StatusCodes.OK).json({ order });
};

//just can mark a order as delivered
const updateAnOrdersStatus = async (req, res) => {
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
    throw new CustomError.NotFoundError(`Order with Id ${orderId} not found`);
  }

  if(order.status == "Cancelled"){
    return res.status(StatusCodes.BAD_REQUEST).json("This order is cancelled.  Cannot be Delivered.")
  }

  await Order.findByIdAndUpdate(
    { _id: orderId },
    { status: 'Delivered' },
    { new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json(
      `status of the order with Id ${orderId} is updated to Delivered.`
    );
};

const createDish = async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const { name, description, price } = req.body;
  let image = req.body.image || '';
  const newDish = await Dish.create({
    name: name,
    price: price,
    description: description,
    image: image,
    cookerId: cooker._id,
  });
  return res.status(StatusCodes.CREATED).json({ newDish });
};

const deleteDish = async (req, res) => {
  const dishId = req.params.id;
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });
  const dish = await Dish.findOneAndDelete({ cookerId: cooker, _id: dishId });

  if (!dish) {
    throw new CustomError.NotFoundError(`Dish with Id ${dishId} not found`);
  }

  return res.status(StatusCodes.OK).json(dish + ' is deleted successfully');
};

const getAllDishes = async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email }, { _id: 1 });

  const dishes = await Dish.find({ cookerId: cooker._id });
  return res.status(StatusCodes.OK).json({ dishes });
};

const updateDish = async (req, res) => {
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
  return res.status(StatusCodes.OK).json(dish + ' is updated successfully');
};

const setPaymentType = async (req, res) => {
  const cooker = await Cooker.findOne({ email: req.auth.email });
  if (!req.body.paymentType) {
    throw new CustomError.BadRequestError('Payment type cannot be empty.');
  }

  if (req.body.paymentType) {
    cooker.paymentType.addToSet(req.body.paymentType);
  }
  if (req.body.paymentType === 'card') {
    cooker.status = 'Approved';
  }
  cooker.save();

  return res
    .status(StatusCodes.OK)
    .json(
      `payment type ${req.body.paymentType} added. Current payment options are: ${cooker.paymentType}`
    );
};

module.exports = {
  getProfile,
  updateProfile,
  getAllOrders,
  getAnOrder,
  updateAnOrdersStatus,
  createDish,
  deleteDish,
  getAllDishes,
  updateDish,
  setPaymentType,
};
