const express = require('express');

const CustomerModel = require('../models/customer');
const CustomError = require('../errors');
const routes = express.Router();
const OrderModel = require('../models/order');

routes.get('/', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.user._id).populate(
      'address'
    );
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.put('/', async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndUpdate(
      req.user._id,
      req.body
    );
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.delete('/', async (req, res) => {
  try {
    //delete address too
    const customer = await CustomerModel.findByIdAndDelete(req.user._id);
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    // res.json(updatedCustomer);
    return CustomError.OkResponse('user is deleted');
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.get('/cart', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.user._id);
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    res.json(customer.cart);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.delete('/cart', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.user._id);
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    let itemId = customer.cart.itemId;
    let total = customer.cart.total;
    customer.cart = {
      itemId: [],
      total: 0,
    };
    const updatedCustomer = await customer.save();
    return CustomError.OkResponse('Cart information deleted successfully');
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});
routes.post('/cart', async (req, res) => {
  //to add item to cart which is sepet
  try {
    const customer = await CustomerModel.findById(req.user._id);
    if (!customer) {
      throw new CustomError.BadRequestError('Customer not found');
    }
    let itemId = req.body.itemId;
    let total = req.body.total;
    if (!itemId || !total) {
      throw new CustomError.BadRequestError('Cart data incomplete');
    }
    customer.cart.itemId.push(itemId);
    customer.cart.total += total;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
    // return CustomError.OkResponse('Cart information deleted successfully')
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.get('/orders', async (req, res) => {
  try {
    const customerId = req.user._id;

    const orders = await OrderModel.find({ customerId })
      .populate('dishes')
      .populate('deliveryAddress');
    if (!orders) {
      throw new CustomError.BadRequestError('Order not found');
    }

    for (const order of orders) {
      if (order.customerId.toString() !== customerId.toString()) {
        throw new CustomError.UnauthorizedError(
          'You are not authorized to access order data'
        );
      }
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.get('/order/:id', async (req, res) => {
  try {
    const customerId = req.user._id;
    const orderId = req.params.id;

    const order = await OrderModel.findById(orderId)
      .populate('dishes')
      .populate('deliveryAddress');

    if (!order) {
      throw new CustomError.BadRequestError('Order not found');
    }
    if (order.customerId !== customerId) {
      throw new CustomError.UnauthorizedError(
        'You are not authorized to see order data'
      );
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.post('/order', async (req, res) => {
  try {
    const { dishes, deliveryAddress, expectedDeliveryTime } = req.body;
    const customerId = req.user._id;

    const order = new OrderModel({
      dishes,
      customerId,
      deliveryAddress,
      expectedDeliveryTime,
      //   totalAmount: dishes.price,
    });

    const createdOrder = await order.save();

    res.json(createdOrder);
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

routes.delete('/order/:id', async (req, res) => {
  try {
    const customerId = req.user._id;
    const orderId = req.params.id;

    const order = await OrderModel.findById(orderId)
      .populate('dishes')
      .populate('deliveryAddress');

    if (!order) {
      throw new CustomError.BadRequestError('Order not found');
    }
    if (order.customerId !== customerId) {
      throw new CustomError.UnauthorizedError(
        'You are not authorized to delete order data'
      );
    }
    order.delete();
    res.json('Order deleted successfully');
  } catch (error) {
    console.error(error);
    throw new CustomError.InternalServerError('Internal server error');
  }
});

module.exports = routes;
