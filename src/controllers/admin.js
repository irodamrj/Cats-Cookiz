const CustomerModel = require('../models/customer');
const CookModel = require('../models/cooker');
const OrderModel = require('../models/order');
const CommentModel = require('../models/comment');
const AddressModel = require('../models/address');
const DishModel = require('../models/dish');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

//do not delete orders
const deleteCooker = async (req, res) => {
  const { id } = req.params;
  const cook = await CookModel.findByIdAndDelete(id).populate('address');
  if (!cook) {
    throw new Error('Cook not found');
  }
  await CommentModel.deleteMany({ cookerId: id });
  if (cook.address) {
    await AddressModel.findByIdAndDelete(cook.address._id);
  }
  await DishModel.deleteMany({ cookerId: id });
  return res.status(StatusCodes.OK).json('Cooker deleted successfully');
};

//do not delete orders
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const customer = await CustomerModel.findOneAndUpdate(
    { _id: id },
    { $unset: { cart: 1 } }
  ).populate('address');
  if (!customer) {
    throw new CustomError.NotFoundError('Customer not found');
  }
  if (customer.address) {
    await AddressModel.findByIdAndDelete(customer.address._id);
  }

  await CustomerModel.findByIdAndDelete(id);
  return res.status(StatusCodes.OK).json('Customer deleted successfully');
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;

  const updatedOrder = await OrderModel.findByIdAndUpdate(
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

module.exports = { deleteCooker, deleteCustomer, updateOrder };
