const { ROUTES, customer, incorrectCustomer, customerSignup } = require('../data');
jest.setTimeout(15000);

const app = require('../app');
const request = require('supertest');
const db = require('../db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';
afterAll(async () => await db.closeDatabase());

function objToUrlEncoded(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const parts = keys.map((key, i) => `${key}=${values[i]}`);

  return parts.join('&');
}

describe('Customers', () => {
    describe('Customer authentication', () => {
      describe('Customer login', () => {
        it('Should return status code 200 and login user', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_LOGIN)
            .type('form')
            .send(objToUrlEncoded(customer))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
          expect(res.statusCode).toBe(200);
        });
  
        it('Should return status code 401 if credentials are invalid', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_LOGIN)
            .type('form')
            .send(objToUrlEncoded(incorrectCustomer))
            .set('Accept', 'application/json');
          expect(res.statusCode).toBe(401);
        });
  
        it('Should return status code 400 if credentials are missing', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_LOGIN)
            .type('form')
            .send({ password: '123456' })
            .set('Accept', 'application/json');
          expect(res.statusCode).toBe(400);
        });
      });
  
      describe('Customer signup', () => {
        afterEach(async () => await db.clearDatabase());
        it('Should return status code 201 and newly created account as json', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_SIGNUP)
            .type('form')
            .send(customerSignup)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
          expect(res.statusCode).toBe(201);
        });
  
        it('Should hash password with bcrypt', async () => {
          await request(app)
            .post(ROUTES.CUSTOMER_SIGNUP)
            .type('form')
            .send(customerSignup);
          const customer = await mongoose.connection
            .collection('customers')
            .findOne({ email: customerSignup.email });
  
          expect(customer).toBeDefined();
  
          const valid =
          customer &&
            (await bcrypt.compare(customerSignup.password, customer.password));
  
          expect(valid).toBe(true);
        });
  
        it('Should return status code 400, if email already exists', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_SIGNUP)
            .type('form')
            .send({ ...customerSignup, email: 'firstcustomer@gmail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
          expect(res.statusCode).toBe(400);
        });
  
        it('Should return status code 400 if any of required field is missing', async () => {
          const res = await request(app)
            .post(ROUTES.CUSTOMER_SIGNUP)
            .type('form')
            .send({ ...customerSignup, firstName: undefined })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
          expect(res.statusCode).toBe(400);
        });
      });
    });
  
    describe('When there is not a customer in session', () => {
      const user = request.agent(app);
      it('Should redirect to login page if trying to go an endpoint starting with /api/customer', async () => {
        const res = await user.get(ROUTES.CUSTOMER_PROFILE);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
  
      it('Patch /api/customer/ should redirect to login page', async () => {
        const res = await user.patch(ROUTES.CUSTOMER_PROFILE);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
  
      it('Delete /api/customer/ should redirect to login page', async () => {
        const res = await user.delete(ROUTES.CUSTOMER_PROFILE);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
      
      
      it('Should redirect to login page if trying to go an endpoint starting with /api/customer/cart', async () => {
        const res = await user.get(ROUTES.CUSTOMER_CART);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
  
      it('Patch /api/customer/cart should redirect to login page', async () => {
        const res = await user.patch(ROUTES.CUSTOMER_CART);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
  
      it('Post /api/customer/cart should redirect to login page', async () => {
        const res = await user.post(ROUTES.CUSTOMER_CART);
        expect(res.statusCode).toBe(302);
        expect(res.header['location']).toBe(ROUTES.CUSTOMER_LOGIN);
      });
    });
  
    describe('When there is a customer in session', () => {
      const userlogin = request.agent(app);
      const usersignup = request.agent(app);
      const orderId = '64bc5ea696f2c61b22b3bc8a';
      let dishId;
  
      beforeAll(async () => {
        await userlogin
          .post(ROUTES.CUSTOMER_LOGIN)
          .type('form')
          .send(objToUrlEncoded(customer))
          .set('Accept', 'application/json');
        await usersignup
          .post(ROUTES.CUSTOMER_SIGNUP)
          .type('form')
          .send(customerSignup)
          .set('Accept', 'application/json');
      });
  
      afterAll(async () => db.clearDatabase());
  
      it('Get customer/ should return customer profile as json', async () => {
        const res = await usersignup
          .get(ROUTES.CUSTOMER_PROFILE)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
  
      it('Patch customer/ should update customer profile', async () => {
        const updatedProperty = {
        firstName : "sara", 
        lastName: "ss", 
        phoneNumber: 1111,
         address:{  
          "country":"izmit",
         "zipcode":34,
         "street":"33 cd",
         "buildingNumber":"3A",
         "flatNumber":2,
         "floor":12
             }
         }
        const res = await customerSignup
          .patch(ROUTES.CUSTOMER_PROFILE)
          .type('form')
          .send({ address: updatedProperty })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
  
        const customer = await mongoose.connection
          .collection('customers')
          .findOne({ email: customerSignup.email });
  
        const address = await mongoose.connection
          .collection('addresses')
          .findOne({ _id: customer.address });
  
        expect(address).toMatchObject(updatedProperty);
  
        expect(res.statusCode).toBe(200);
      });
      
      // it('Delete customer/ should customer profile', async () => {
      //   const res = await userlogin
      //     .delete(ROUTES.CUSTOMER_CART)
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/);
  
      //   const dish = await mongoose.connection
      //     .collection('dishes')
      //     .findOne({ _id: dishId });
      //   expect(dish).toBe(null);
      //   expect(res.statusCode).toBe(200);
      // });
  
      it('get customer/cart should return cart of a customer', async () => {
        const res = await userlogin
          .get(ROUTES.CUSTOMER_CART)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
  
      it('Patch customer/cart should update cart status', async () => {
        const res = await userlogin
          .patch(ROUTES.CUSTOMER_CART)
         .send(  {
          'cart.itemId': [],
          'cart.total': 0,
        },)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
  
      // it('Post  customer/cart add new items to cart', async () => {
      //   const newDish = {
      //     name: 'pizza',
      //     description: 'mozarella and mushroom',
      //     price: 16,
      //   };
      //   const res = await userlogin
      //     .post(ROUTES.COOK_DISHES)
      //     .type('form')
      //     .send(newDish)
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/);
      //   expect(res.statusCode).toBe(201);
      // });
  
     
  
     
     
    });
  });
  