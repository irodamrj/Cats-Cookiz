const { ROUTES, user1, incorrectUser, userSignup } = require('../data');
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

describe('Cookers', () => {
  describe('Cooker authentication', () => {
    describe('Cooker login', () => {
      it('Should return status code 200 and login user', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_LOGIN)
          .type('form')
          .send(objToUrlEncoded(user1))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(200);
      });

      it('Should return status code 401 if credentials are invalid', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_LOGIN)
          .type('form')
          .send(objToUrlEncoded(incorrectUser))
          .set('Accept', 'application/json');
        expect(res.statusCode).toBe(401);
      });

      it('Should return status code 400 if credentials are missing', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_LOGIN)
          .type('form')
          .send({ password: '123456' })
          .set('Accept', 'application/json');
        expect(res.statusCode).toBe(400);
      });
    });

    describe('Cooker signup', () => {
      afterEach(async () => await db.clearDatabase());
      it('Should return status code 201 and newly created account as json', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_SIGNUP)
          .type('form')
          .send(userSignup)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(201);
      });

      it('Should hash password with bcrypt', async () => {
        await request(app)
          .post(ROUTES.COOK_SIGNUP)
          .type('form')
          .send(userSignup);

        const cooker = await mongoose.connection
          .collection('cookers')
          .findOne({ email: userSignup.email });

        expect(cooker).toBeDefined();

        const valid =
          cooker &&
          (await bcrypt.compare(userSignup.password, cooker.password));

        expect(valid).toBe(true);
      });

      it('Should return status code 400, if email already exists', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_SIGNUP)
          .type('form')
          .send({ ...userSignup, email: 'first@gmail.com' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(400);
      });

      it('Should return status code 400 if any of required field is missing', async () => {
        const res = await request(app)
          .post(ROUTES.COOK_SIGNUP)
          .type('form')
          .send({ ...userSignup, address: undefined })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/);
        expect(res.statusCode).toBe(400);
      });
    });
  });

  describe('When there is not a cooker in session', () => {
    const user = request.agent(app);
    it('Should redirect to login page if trying to go an endpoint starting with /api/cooker', async () => {
      const res = await user.get(ROUTES.COOK_DISHES);
      expect(res.statusCode).toBe(302);
      expect(res.header['location']).toBe(ROUTES.COOK_LOGIN);
    });

    it('Patch /api/cooker/ should redirect to login page', async () => {
      const res = await user.patch(ROUTES.COOK_PROFILE);
      expect(res.statusCode).toBe(302);
      expect(res.header['location']).toBe(ROUTES.COOK_LOGIN);
    });

    it('Get /api/cooker/orders should redirect to login page', async () => {
      const res = await user.get(ROUTES.COOK_ORDERS);
      expect(res.statusCode).toBe(302);
      expect(res.header['location']).toBe(ROUTES.COOK_LOGIN);
    });
  });

  describe('When there is a cooker in session', () => {
    const userlogin = request.agent(app);
    const usersignup = request.agent(app);
    const orderId = '64caa74d777867d29fd25beb';
    let dishId;

    beforeAll(async () => {
      await userlogin
        .post(ROUTES.COOK_LOGIN)
        .type('form')
        .send(user1)
        .set('Accept', 'application/json');
      await usersignup
        .post(ROUTES.COOK_SIGNUP)
        .type('form')
        .send(userSignup)
        .set('Accept', 'application/json');
    });

    afterAll(async () => db.clearDatabase());

    it('Get cooker/profile should return cooker profile as json', async () => {
      const res = await usersignup
        .get(ROUTES.COOK_PROFILE)
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(200);
    });

    it('Patch cooker/profile should update cookers profile', async () => {
      const updatedProperty = {
        country: 'Ozbekistan',
        city: 'Tashkent',
        state: 'UZ',
        zipcode: 12345,
        street: 'Main Street',
        buildingNumber: '123',
        buildingName: 'ABC Building',
        flatNumber: 4,
        floor: 2,
      };

      const res = await usersignup
        .patch(ROUTES.COOK_PROFILE)
        .type('form')
        .send({ address: updatedProperty })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const cook = await mongoose.connection
        .collection('cookers')
        .findOne({ email: userSignup.email });

      const address = await mongoose.connection
        .collection('addresses')
        .findOne({ _id: cook.address });

      expect(address).toMatchObject(updatedProperty);

      expect(res.statusCode).toBe(200);
    });

    it('get cooker/orders should return all orders of a cooker', async () => {
      const res = await userlogin
        .get(ROUTES.COOK_ORDERS)
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(200);
    });

    it('get cooker/orders/:id should return an order of a cooker', async () => {
      const res = await userlogin
        .get(`${ROUTES.COOK_ORDERS}/${orderId}`)
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(200);
    });

    it('Patch cooker/orders/:id should update an orders status', async () => {
      const res = await userlogin
        .patch(`${ROUTES.COOK_ORDERS}/${orderId}`)
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(200);
    });

    it('Post cooker/dishes should check if cooker is approved', async () => {
      const newDish = {
        name: 'pizza',
        description: 'mozarella and mushroom',
        price: 16,
      };
      const res = await userlogin
        .post(ROUTES.COOK_DISHES)
        .type('form')
        .send(newDish)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      expect(res.statusCode).toBe(201);
    });

    it('Post cooker/dishes should create new dish', async () => {
      const newDish = {
        name: 'pizza',
        description: 'mozarella and mushroom',
        price: 16,
      };
      const res = await userlogin
        .post(ROUTES.COOK_DISHES)
        .type('form')
        .send(newDish)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const dish = await mongoose.connection
        .collection('dishes')
        .findOne({}, { sort: { createdAt: -1 } });
      expect(dish).not.toBe(null);
      expect(dish).toMatchObject(newDish);

      dishId = dish._id;
      expect(res.statusCode).toBe(201);
    });

    it('Patch cooker/dishes/:id should update a dish', async () => {
      const res = await userlogin
        .patch(`${ROUTES.COOK_DISHES}/${dishId}`)
        .type('form')
        .send({ price: 200 });

      const dish = await mongoose.connection
        .collection('dishes')
        .findOne({ _id: dishId });

      expect(dish.price).toEqual(200);
      expect(res.statusCode).toBe(200);
    });

    it('Get cooker/dishes should return all of the cookers dishes', async () => {
      const res = await userlogin.get(ROUTES.COOK_DISHES);
      expect(res.statusCode).toBe(200);
    });

    it('Delete cooker/dishes/:id should delete a dish', async () => {
      const res = await userlogin
        .delete(`${ROUTES.COOK_DISHES}/${dishId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const dish = await mongoose.connection
        .collection('dishes')
        .findOne({ _id: dishId });
      expect(dish).toBe(null);
      expect(res.statusCode).toBe(200);
    });

    it('Post cooker/paymentType should set a new payment type', async () => {
      const type = 'card';
      const res = await usersignup
        .post(ROUTES.COOK_PAYMENT)
        .type('form')
        .send({ paymentType: type })
        .expect('Content-Type', /json/);

      const cook = await mongoose.connection
        .collection('cookers')
        .findOne({ email: userSignup.email });

      console.log(cook);

      expect(cook.paymentType).toContain(type);
      expect(cook.paymentType).not.toBe(null);
      expect(res.statusCode).toBe(200);
    });
  });
});
