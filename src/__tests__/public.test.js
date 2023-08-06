const {
    ROUTES,
    customer1,
    customerSignup,
    items,user1,
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
      let dishId="64caa71b777867d29fd25bce";
      let cookerId="64caa707777867d29fd25bc6";
 
  
      beforeAll(async () => {
        await customerlogin
          .post(ROUTES.COOK_LOGIN)
          .type('form')
          .send(user1)
          .set('Accept', 'application/json');
  
      });
  
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
        const res = await request.agent(app).get(`${ROUTES.PUBLIC_DISH}/${dishId}`);
        console.log(res.body.dish)
        const myObjectId = new mongoose.Types.ObjectId(dishId);
        const dishItem = await mongoose.connection
        .collection('dishes')
        .findOne({_id:myObjectId});

        expect(res.body.dish._id).toBe(dishItem._id.toHexString()); 
        expect(dishItem).not.toBe(undefined);
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
        const res = await request.agent(app).get(`${ROUTES.PUBLIC_COOKERS}/${cookerId}`);
        const myCookerId = new mongoose.Types.ObjectId(cookerId);

        const cooker = await mongoose.connection
        .collection('cookers')
        .findOne({ _id:myCookerId});
        expect(res.body.cooker._id).toBe(cooker._id.toHexString()); 
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBe(undefined);
      });
  
  
  });
  