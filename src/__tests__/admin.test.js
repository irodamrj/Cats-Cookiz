const { ROUTES, admin, wrongAdmin, customerSignup,userSignup,orderSignup } = require('../data');
jest.setTimeout(15000);

const app = require('../app');
const request = require('supertest');
const req = require('supertest')(app);
const db = require('../db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

process.env.NODE_ENV = 'test';
afterAll(async () => await db.closeDatabase());

function objToUrlEncoded(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const parts = keys.map((key, i) => `${key}=${values[i]}`);

  return parts.join('&');
}
describe('Admin', () => {
    describe('Admin authentication', () => {

      describe('Admin login', () => {
        it('Should return status code 200 and login admin', async () => {
          const res = await request(app)
            .post(ROUTES.ADMIN_LOGIN)
            .type('form')
            .send(objToUrlEncoded(admin))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
          expect(res.statusCode).toBe(200);
        });
  
        it('Should return status code 401 if credentials are invalid', async () => {
          const res = await request(app)
            .post(ROUTES.ADMIN_LOGIN)
            .type('form')
            .send(objToUrlEncoded(wrongAdmin))
            .set('Accept', 'application/json');
          expect(res.statusCode).toBe(401);
        });
  
        it('Should return status code 400 if credentials are missing', async () => {
          const res = await request(app)
            .post(ROUTES.ADMIN_LOGIN)
            .type('form')
            .send({ password: '123456' })
            .set('Accept', 'application/json');
          expect(res.statusCode).toBe(400);
        });
      });
  
    
    });
  
    describe('When there is not a admin in session', () => {
  

      const user = request.agent(app);
      const cooker = request.agent(app);
      const customer = request.agent(app);
      const order = request.agent(app);

      beforeAll(async () => {
        await customer
        .post(ROUTES.CUSTOMER_SIGNUP)
        .type('form')
        .send(customerSignup)
        .set('Accept', 'application/json');
       
          await cooker
          .post(ROUTES.COOK_SIGNUP)
          .type('form')
          .send(userSignup)
          .set('Accept', 'application/json');
          await order
          .post(ROUTES.ORDER)
          .type('form')
          .send(orderSignup)
          .set('Accept', 'application/json');
      });
  
      afterAll(async () => db.clearDatabase());
  
      it('Delete /api/admin/cooker/id should redirect to login page', async () => {
        
         const res = await user.delete(`${ROUTES.ADMIN_COOKER}/${cooker._id}`);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
      });

      it('Delete /api/admin/customer/id should redirect to login page', async () => {
        const res = await user.delete(`${ROUTES.ADMIN_CUSTOMER}/${customer._id}`);
       expect(res.statusCode).toBe(302);
       expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
     });

      it('Patch /api/admin/order/id should redirect to login page', async () => {
        const res = await user.patch(`${ROUTES.ADMIN_ORDER}/${order._id}`);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
      });

      it('Get /api/admin/customers', async () => {
        const res = await user.get(ROUTES.ADMIN_CUSTOMERS);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
      });
  
      it('Get /api/admin/cookers', async () => {
        const res = await user.get(ROUTES.ADMIN_COOKERS);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
      });
      it('Get /api/admin/dishes', async () => {
        const res = await user.get(ROUTES.ADMIN_DISHES);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
      });
    });
  
    describe('When there is a admin in session', () => {
      const adminlogin = request.agent(app);
      const customerSignupRoute = request.agent(app);
      const orderId = '64caa74d777867d29fd25beb';
      const cookerSignup = request.agent(app);

      beforeAll(async () => {
        await customerSignupRoute
        .post(ROUTES.CUSTOMER_SIGNUP)
        .type('form')
        .send(customerSignup)
        .set('Accept', 'application/json');
        
        await cookerSignup
        .post(ROUTES.COOK_SIGNUP)
        .type('form')
        .send(userSignup)
        .set('Accept', 'application/json');

          await adminlogin
          .post(ROUTES.ADMIN_LOGIN)
          .type('form')
          .send(objToUrlEncoded(admin))
          .set('Accept', 'application/json');
      });

      afterAll(async () => db.clearDatabase());
  
      it('Delete cooker/:id should delete cooker profile as json', async () => {
        const cooker = await cookerSignup
        .get(ROUTES.COOK_PROFILE)
        .expect('Content-Type', /json/);
        const cookerId=cooker.body.cooker._id
        const res = await adminlogin
          .delete(`${ROUTES.ADMIN_COOKER}/${cookerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
      
        const deletedCooker = await mongoose.connection
          .collection('cookers')
          .findOne({ _id: cookerId });
      
        expect(deletedCooker).toBe(null);
        expect(res.statusCode).toBe(200);
      });


      it('Delete customer/:id should delete customer profile as json', async () => {
        const customer = await customerSignupRoute
        .get(ROUTES.CUSTOMER_PROFILE)
        .expect('Content-Type', /json/);
        const customerId=customer.body.customer._id
        const res = await adminlogin
          .delete(`${ROUTES.ADMIN_CUSTOMER}/${customerId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
      
        const deletedCustomer = await mongoose.connection
          .collection('customers')
          .findOne({ _id: customerId });
      
        expect(deletedCustomer).toBe(null);
        expect(res.statusCode).toBe(200);
      });

      it('Patch order/:id should update order status', async () => {
        const myObjectId = new mongoose.Types.ObjectId(orderId);

        const res = await adminlogin
          .patch(`${ROUTES.ADMIN_ORDER}/${orderId}`)
          .type('form')
          .send({ status: 'Cancelled' });
      
        const UpdatedOrder = await mongoose.connection
          .collection('orders')
          .findOne({ _id: myObjectId });
      
        expect(UpdatedOrder.status).toBe('Cancelled');
        expect(res.statusCode).toBe(200);
      });
       
    it('get /cookers should return cookers', async () => {
        const res = await adminlogin
          .get(ROUTES.ADMIN_COOKERS)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
        
      it('get /customers should return customers', async () => {
        const res = await adminlogin
          .get(ROUTES.ADMIN_CUSTOMERS)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
      it('get /dishes should return dishes', async () => {
        const res = await adminlogin
          .get(ROUTES.ADMIN_DISHES)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
    });
  });
  