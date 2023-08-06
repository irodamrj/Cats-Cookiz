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
  
  describe('Public', () => {

  
      const customerlogin = request.agent(app);
      const customersignup = request.agent(app);
      // let orderId;
      // let custId;
      // let cookerId;
  
      // beforeAll(async () => {
      //   await customerlogin
      //     .post(ROUTES.CUSTOMER_LOGIN)
      //     .type('form')
      //     .send(customer1)
      //     .set('Accept', 'application/json');
      //   await customersignup
      //     .post(ROUTES.CUSTOMER_SIGNUP)
      //     .type('form')
      //     .send(customerSignup)
      //     .set('Accept', 'application/json');
      // });
  
      afterAll(async () => db.clearDatabase());
  
      it('Get /home should return 10 dishes', async () => {
        const res = await request.agent(app).get(ROUTES.PUBLIC_HOME);
        console.log(res.body.dishes.length)
        expect(res.body.dishes.length).toBeLessThanOrEqual(10);
        expect(res.body.dishes.length).toBeGreaterThanOrEqual(0);
        expect(res.body).not.toBe(undefined);
        expect(res.statusCode).toBe(200);
      });

       it('Get /home/dish/id should return dish', async () => {
        const res = await request.agent(app).get(`${ROUTES.PUBLIC_DISH}/dishId`);
        const dish = await mongoose.connection
        .collection('dishes')
        .findOne({ _id:'dishId' });
        expect(res.body).toMatchObject(dish);
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBe(undefined);
      });

      it('Get /home/about should return about page', async () => {
        const res = await request.agent(app).get(`${ROUTES.PUBLIC_ABOUT}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual('This is about page');
      });
      
      it('Get /home/cookers should return 10 dishes', async () => {
        const res = await request.agent(app).get(ROUTES.PUBLIC_COOKERS);
        expect(res.body.cookers.length).toBeLessThanOrEqual(10);
        expect(res.body.cookers.length).toBeGreaterThanOrEqual(0);
        expect(res.body).not.toBe(undefined);
        expect(res.statusCode).toBe(200);
      });
      it('Get /home/cookers/id should return dish', async () => {
        const res = await request.agent(app).get(`${ROUTES.PUBLIC_COOKERS}/cookerId`);
        const dish = await mongoose.connection
        .collection('cookers')
        .findOne({ _id:'cookerId' });
        expect(res.body).toMatchObject(dish);
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBe(undefined);
      });
  
  
  });
  