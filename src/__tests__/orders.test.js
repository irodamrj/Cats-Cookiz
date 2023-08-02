const {
  ROUTES,
  customer1,
  customerSignup,
  items,
  comments,
} = require('../data');
jest.setTimeout(15000);
const app = require('../app');
const request = require('supertest');
const db = require('../db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { emptyObject } = require('@jest/expect-utils');

process.env.NODE_ENV = 'test';
afterAll(async () => await db.closeDatabase());

describe('Orders', () => {
  describe('When there is no user in session', () => {
    const user = request.agent(app);
    it('Should redirect to login page if trying to go an endpoint starting with /api/customer/order', async () => {
      const res = await user.get(`${ROUTES.CUSTOMER_ORDERS}/all`);
      expect(res.statusCode).toBe(302);
      expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
    });
  });
  describe('When there is a customer in session', () => {
    const customerlogin = request.agent(app);
    const customersignup = request.agent(app);
    let orderId;
    let custId;
    let cookerId;

    beforeAll(async () => {
      await customerlogin
        .post(ROUTES.CUSTOMER_LOGIN)
        .type('form')
        .send(customer1)
        .set('Accept', 'application/json');
      await customersignup
        .post(ROUTES.CUSTOMER_SIGNUP)
        .type('form')
        .send(customerSignup)
        .set('Accept', 'application/json');
    });

    afterAll(async () => db.clearDatabase());

    it('Get /api/customer/order/all should return all of the orders of a customer', async () => {
      const res = await customerlogin
        .get(`${ROUTES.CUSTOMER_ORDERS}/all`)
        .expect('Content-Type', /json/);

      const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customer1.email });
      const orders = await mongoose.connection
        .collection('orders')
        .findOne({ customerId: customer._id });

      expect(orders).not.toBe(null);
      expect(res.statusCode).toBe(200);
    });

    it('Get /api/customer/order/all should return empty array for newly signed up customers', async () => {
      const res = await customersignup
        .get(`${ROUTES.CUSTOMER_ORDERS}/all`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customerSignup.email }, { _id: 1 });
      const orders = await mongoose.connection
        .collection('orders')
        .findOne({ customerId: customer._id });
      expect(orders).toBe(null);
      expect(res.statusCode).toBe(200);
    });

    it('Post /api/customer/order should check if customer cart is empty', async () => {
      const res = await customersignup
        .post(ROUTES.CUSTOMER_ORDERS)
        .expect('Content-Type', /json/);

      const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customerSignup.email }, { _id: 0, cart: 1 });

      expect(customer.cart.itemId[0]).toBe(undefined);
      expect(res.statusCode).toBe(400);
    });

    it('Post /api/customer/cart should add items to the cart of the customer', async () => {
      const res = await customerlogin
        .post(ROUTES.CUSTOMER_CART)
        .type('form')
        .send(items)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customer1.email }, { _id: 0, cart: 1 });
      expect(customer.cart.itemId[0]).not.toBe(undefined);
      expect(res.statusCode).toBe(200);
    });

    it('Post /api/customer/order should empty the customers cart', async () => {
      const res = await customerlogin
        .post(ROUTES.CUSTOMER_ORDERS)
        .expect('Content-Type', /json/);

      const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customer1.email }, { cart: 1 });
      custId = customer._id;
      expect(customer.cart.itemId[0]).toBe(undefined);
      expect(res.statusCode).toBe(201);
    });

    it('Post /api/customer/order should create a new order', async () => {
      const order = await mongoose.connection
        .collection('orders')
        .findOne({ customerId: custId }, { sort: { createdAt: -1 } });
      cookerId = order.cookerId;
      orderId = order._id;
      expect(order).not.toBe(undefined);
    });

    it('Get /api/customer/order/:id should return the order with given Id', async () => {
      const res = await customerlogin
        .get(`${ROUTES.CUSTOMER_ORDERS}/${orderId}`)
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(200);
    });

    it('post /api/customer/order/:id/review should add a new comment', async () => {
      const res = await customerlogin
        .post(`${ROUTES.CUSTOMER_ORDERS}/${orderId}/review`)
        .type('form')
        .send(comments)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const comment = await mongoose.connection
        .collection('comments')
        .findOne({ cookerId: cookerId }, { sort: { createdAt: -1 } });
      expect(comment).not.toBe(undefined);
      expect(res.statusCode).toBe(200);
    });

    it('Patch /api/customer/order/:id should cancel the order with given Id', async () => {
      const res = await customerlogin
        .patch(`${ROUTES.CUSTOMER_ORDERS}/${orderId}`)
        .expect('Content-Type', /json/);
      const order = await mongoose.connection
        .collection('orders')
        .findOne({ _id: orderId }, { _id: 0, status: 1 });
      expect(order.status).toEqual('Cancelled');
      expect(res.statusCode).toBe(200);
    });
  });
});
