const { ROUTES, customer, incorrectUser, customerSignup,GOOGLE_REDIRECT_URL,FACEBOOK_REDIRECT_URL } = require('../data');
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
      describe('GET /api/auth/google', () => {
        it('Redirects with correct scope and credentials', async () => {
          const res = await req.get(ROUTES.GOOGLE_AUTH);
          const location = res.header['location'];
    
          const uri = new URL(location);
          const scope = uri.searchParams.get('scope')?.split(' ') ?? [];
          const redirectTo = uri.searchParams.get('redirect_uri') ?? '';
          const client_id = uri.searchParams.get('client_id') ?? '';

          expect(location).not.toBeNull();
          expect(scope).toEqual(
            expect.arrayContaining(['openid', 'email', 'profile'])
          );
          expect(redirectTo).toMatch(GOOGLE_REDIRECT_URL);
          expect(client_id.length).toBeGreaterThan(10);
    
          if (redirectTo) redirectUri = new URL(redirectTo);
        });

      });

      describe('GET /api/auth/facebook', () => {
      it('Redirects with correct scope and credentials', async () => {
         
        const res =  await req 
          .get(ROUTES.FACEBOOK_AUTH)
          .send()
          .expect(302); 
          const location = res.header['location'];
  
          expect(location).not.toBeNull();

          const uri = new URL(location);

          const scope = uri.searchParams.get('scope')?.split(' ') ?? [];
          const redirectTo = uri.searchParams.get('redirect_uri') ?? '';
          const client_id = uri.searchParams.get('client_id') ?? '';

          expect(scope).toEqual(
            expect.arrayContaining(["public_profile,email"])
          );
          expect(redirectTo).toMatch(FACEBOOK_REDIRECT_URL);
          expect(client_id.length).toBeGreaterThan(10);
          expect(res.statusCode).toBe(302);
      });
    });
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
            .send(objToUrlEncoded(incorrectUser))
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
            .send({ ...customerSignup, email: 'iroda@gmail.com' })
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
        const res = await userlogin
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
          "city":"izmit",
          "state":"kk",
         "zipcode":34,
         "street":"33 cd",
         "buildingNumber":"3A",
         "flatNumber":2,
         "floor":12
             }
         }
        const res = await usersignup
        .patch(ROUTES.CUSTOMER_PROFILE)
          .type('form')
          .send(updatedProperty)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
  
        const customer = await mongoose.connection
          .collection('customers')
          .findOne({ email: customerSignup.email });
        const address = await mongoose.connection
          .collection('addresses')
          .findOne({ _id: customer.address });
        expect(address).toMatchObject(updatedProperty.address);
  
        expect(res.statusCode).toBe(200);
      });
      
      it('Delete customer/ should customer profile', async () => {
        const customer = await mongoose.connection
        .collection('customers')
        .findOne({ email: customerSignup.email },);
        const res = await usersignup
          .delete(ROUTES.CUSTOMER_PROFILE)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);

        const customerAddress = await mongoose.connection
          .collection('addresses')
          .findOne({ _id: customer.address._id });
        expect(customerAddress).toBe(null);
        expect(res.statusCode).toBe(200);
      });
  
      it('get customer/cart should return cart of a customer', async () => {
        const res = await userlogin
          .get(ROUTES.CUSTOMER_CART)
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });
  
      it('Patch customer/cart should update cart status', async () => {
        const res = await userlogin
          .patch(ROUTES.CUSTOMER_CART)
         .send({
          'cart.itemId': [],
          'cart.total': 0,})
  
        expect(res.statusCode).toBe(200);
      });
  
      // it('Post  customer/cart add new items to cart', async () => {
      //   const newDish = {
      //     name: 'pizza',
      //     description: 'mozarella and mushroom',
      //     price: 16,
      //   };
      //   const res = await userlogin
      //     .post(ROUTES.CUSTOMER_CART)
      //     .type('form')
      //     .send(newDish)
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/);
      //   expect(res.statusCode).toBe(201);
      // });

    });
  });
  