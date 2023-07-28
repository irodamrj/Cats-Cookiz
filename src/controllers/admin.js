const Customer = require('../models/customer');
const Cooker = require('../models/cooker');
const Order = require('../models/order');
const Comment = require('../models/comment');
const Address = require('../models/address');
const Dish = require('../models/dish');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

//do not delete orders
const deleteCooker = async (req, res) => {
  const { id } = req.params;
  const cook = await Cooker.findByIdAndDelete(id).populate('address');
  if (!cook) {
    throw new Error('Cook not found');
  }
  await Comment.deleteMany({ cookerId: id });
  if (cook.address) {
    await Address.findByIdAndDelete(cook.address._id);
  }
  await Dish.deleteMany({ cookerId: id });
  return res.status(StatusCodes.OK).json('Cooker deleted successfully');
};

//do not delete orders
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const customer = await Customer.findOneAndUpdate(
    { _id: id },
    { $unset: { cart: 1 } }
  ).populate('address');
  if (!customer) {
    throw new CustomError.NotFoundError('Customer not found');
  }
  if (customer.address) {
    await Address.findByIdAndDelete(customer.address._id);
  }

  await Customer.findByIdAndDelete(id);
  return res.status(StatusCodes.OK).json('Customer deleted successfully');
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;

  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    { status: 'Cancelled' },
    { new: true }
  );

  return res
    .status(StatusCodes.OK)
    .json(
      `status of the order with Id ${orderId} is updated to ${updatedOrder}`
    );
};

const getDishes = async (req, res) => {
  const dishes = await Dish.find().populate('cookerId');
  return res.status(StatusCodes.OK).json({ dishes });
};

const getCookers = async (req, res) => {
  const cookers = await Cooker.find();
  return res.status(StatusCodes.OK).json({ cookers });
};

const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  return res.status(StatusCodes.OK).json({ customers });
};

module.exports = {
  deleteCooker,
  deleteCustomer,
  updateOrder,
  getDishes,
  getCookers,
  getCustomers,
};
