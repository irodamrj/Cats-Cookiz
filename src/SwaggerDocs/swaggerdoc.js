const swaggerJsdoc = require('swagger-jsdoc');
const cookerDoc = require('./auth/cookerDoc');
const CustomerDocs = require('./auth/customerDocs');
const cookerApiDoc = require('./cooker/cookerDocs');
const customerApiDocs = require('./costumer/costumerDocs');
const orderDocs =require ('./order/orderDocs')
const adminDocs = require('./admin/adminDocs');
const adminDoc =require('./auth/adminDoc');
const publicApi = require("./public/publicdocs")

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cookiz API Docs',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Customer',
        description: 'API to manage your Customer Acc',
      },
      {
        name: 'Cooker',
        description: 'API to manage your Cooker Acc',
      },
      {
        name: 'Admin',
        description: 'API to manage your Cooker Acc',
      },
      {
        name: 'Public',
        description: 'API to manage your Cooker Acc',
      },
    ],
    paths: {
      ...cookerDoc.paths,
      ...CustomerDocs.paths,
      ...cookerApiDoc.paths,
      ...customerApiDocs.paths,
      ...orderDocs.paths,
      ...adminDocs.paths,
      ...adminDoc.paths,
      ...publicApi.paths

    
    },
  },

  apis: [
    './src/controllers/authForCooker.js',
    './src/controllers/authForCustomer.js',
    './src/controllers/cookers.js',
    './src/controllers/customers.js',
    './src/controllers/orders.js',
    './src/controllers/admin.js',
    './src/controllers/authForAdmin.js',
    '../controllers/public.js'


  ],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
