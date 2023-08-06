// const { ROUTES, admin, wrongAdmin, customerSignup } = require('../data');
// jest.setTimeout(15000);

// const app = require('../app');
// const request = require('supertest');
// const req = require('supertest')(app);
// const db = require('../db');
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const passport = require('passport');

// process.env.NODE_ENV = 'test';
// afterAll(async () => await db.closeDatabase());

// function objToUrlEncoded(obj) {
//   const keys = Object.keys(obj);
//   const values = Object.values(obj);
//   const parts = keys.map((key, i) => `${key}=${values[i]}`);

//   return parts.join('&');
// }
// describe('Admin', () => {
//     describe('Admin authentication', () => {

//       describe('Admin login', () => {
//         it('Should return status code 200 and login admin', async () => {
//           const res = await request(app)
//             .post(ROUTES.ADMIN_LOGIN)
//             .type('form')
//             .send(objToUrlEncoded(admin))
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/);
//           expect(res.statusCode).toBe(200);
//         });
  
//         it('Should return status code 401 if credentials are invalid', async () => {
//           const res = await request(app)
//             .post(ROUTES.ADMIN_LOGIN)
//             .type('form')
//             .send(objToUrlEncoded(wrongAdmin))
//             .set('Accept', 'application/json');
//           expect(res.statusCode).toBe(401);
//         });
  
//         it('Should return status code 400 if credentials are missing', async () => {
//           const res = await request(app)
//             .post(ROUTES.ADMIN_LOGIN)
//             .type('form')
//             .send({ password: '123456' })
//             .set('Accept', 'application/json');
//           expect(res.statusCode).toBe(400);
//         });
//       });
  
    
//     });
  
//     describe('When there is not a admin in session', () => {
//       const cookerId='64bc5d6de3d1f3423fd7952f';
//       const orderId='64bc5ea696f2c61b22b3bc8a';

//       const customerId='64bc5e2796f2c61b22b3bc6f';

//       const user = request.agent(app);
  
//       it('Delete /api/admin/cooker/id should redirect to login page', async () => {
//          const res = await user.delete(`${ROUTES.ADMIN_COOKER}/${cookerId}`);
//         expect(res.statusCode).toBe(302);
//         expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//       });

//       it('Delete /api/admin/customer/id should redirect to login page', async () => {
//         const res = await user.delete(`${ROUTES.ADMIN_CUSTOMER}/${customerId}`);
//        expect(res.statusCode).toBe(302);
//        expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//      });

//       it('Patch /api/admin/order/id should redirect to login page', async () => {
//         const res = await user.patch(`${ROUTES.ADMIN_ORDER}/${orderId}`);
//         expect(res.statusCode).toBe(302);
//         expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//       });
//       it('Get /api/admin/customers', async () => {
//         const res = await user.get(ROUTES.ADMIN_CUSTOMERS);
//         expect(res.statusCode).toBe(302);
//         expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//       });
  
//       it('Get /api/admin/cookers', async () => {
//         const res = await user.get(ROUTES.ADMIN_COOKERS);
//         expect(res.statusCode).toBe(302);
//         expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//       });
//       it('Get /api/admin/dishes', async () => {
//         const res = await user.get(ROUTES.ADMIN_DISHES);
//         expect(res.statusCode).toBe(302);
//         expect(res.header['location']).toBe(ROUTES.ADMIN_LOGIN);
//       });
    
  
  
     
//     });
  
//     describe('When there is a customer in session', () => {
//       const adminlogin = request.agent(app);
//       const cookerId='64bc5d6de3d1f3423fd7952f';
//       const orderId='64bc5ea696f2c61b22b3bc8a';

//       const customerId='64bc5e2796f2c61b22b3bc6f';
  
//       beforeAll(async () => {
//         await adminlogin
//           .post(ROUTES.ADMIN_LOGIN)
//           .type('form')
//           .send(objToUrlEncoded(admin))
//           .set('Accept', 'application/json');
//       });
  
//       afterAll(async () => db.clearDatabase());
  
//       it('Delete cooker/:id should delete cooker profile as json', async () => {
//         const res = await adminlogin
//           .delete(`${ROUTES.ADMIN_COOKER}/${cookerId}`)
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/);
//         const cooker = await mongoose.connection
//           .collection('cookers')
//           .findOne({ _id: cookerId });
//         expect(cooker).toBe(null);
//         expect(res.statusCode).toBe(200);
//       });
  
//       // it('Patch customer/ should update customer profile', async () => {
//       //   const updatedProperty = {
//       //   firstName : "sara", 
//       //   lastName: "ss", 
//       //   phoneNumber: 1111,
//       //    address:{  
//       //     "country":"izmit",
//       //     "city":"izmit",
//       //     "state":"kk",
//       //    "zipcode":34,
//       //    "street":"33 cd",
//       //    "buildingNumber":"3A",
//       //    "flatNumber":2,
//       //    "floor":12
//       //        }
//       //    }
//       //   const res = await usersignup
//       //   .patch(ROUTES.CUSTOMER_PROFILE)
//       //     .type('form')
//       //     .send(updatedProperty)
//       //     .set('Accept', 'application/json')
//       //     .expect('Content-Type', /json/);
  
//       //   const customer = await mongoose.connection
//       //     .collection('customers')
//       //     .findOne({ email: customerSignup.email });
//       //   const address = await mongoose.connection
//       //     .collection('addresses')
//       //     .findOne({ _id: customer.address });
//       //   expect(address).toMatchObject(updatedProperty.address);
  
//       //   expect(res.statusCode).toBe(200);
//       // });
      
//       // it('Delete customer/ should customer profile', async () => {
//       //   const customer = await mongoose.connection
//       //   .collection('customers')
//       //   .findOne({ email: customerSignup.email },);
//       //   const res = await usersignup
//       //     .delete(ROUTES.CUSTOMER_PROFILE)
//       //     .set('Accept', 'application/json')
//       //     .expect('Content-Type', /json/);

//       //   const customerAddress = await mongoose.connection
//       //     .collection('addresses')
//       //     .findOne({ _id: customer.address._id });
//       //   expect(customerAddress).toBe(null);
//       //   expect(res.statusCode).toBe(200);
//       // });
  
//       // it('get customer/cart should return cart of a customer', async () => {
//       //   const res = await userlogin
//       //     .get(ROUTES.CUSTOMER_CART)
//       //     .expect('Content-Type', /json/);
//       //   expect(res.statusCode).toBe(200);
//       // });
  
//       // it('Patch customer/cart should update cart status', async () => {
//       //   const res = await userlogin
//       //     .patch(ROUTES.CUSTOMER_CART)
//       //    .send(  {
//       //     'cart.itemId': [],
//       //     'cart.total': 0,
//       //   },)
//       //     .expect('Content-Type', /json/);
//       //   expect(res.statusCode).toBe(200);
//       // });
  
//       // // it('Post  customer/cart add new items to cart', async () => {
//       // //   const newDish = {
//       // //     name: 'pizza',
//       // //     description: 'mozarella and mushroom',
//       // //     price: 16,
//       // //   };
//       // //   const res = await userlogin
//       // //     .post(ROUTES.CUSTOMER_CART)
//       // //     .type('form')
//       // //     .send(newDish)
//       // //     .set('Accept', 'application/json')
//       // //     .expect('Content-Type', /json/);
//       // //   expect(res.statusCode).toBe(201);
//       // // });
     
     
//     });
//   });
  