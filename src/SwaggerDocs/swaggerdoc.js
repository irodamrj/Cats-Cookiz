const swaggerJsdoc = require('swagger-jsdoc');
const cookerDoc = require('./auth/cookerDoc');
const CustomerDocs = require('./auth/customerDocs');

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
        description: 'API to manage your Customer',
      },
      {
        name: 'Cooker',
        description: 'API to manage your Cooker',
      },
    ],
    paths: {
      ...cookerDoc.paths,
      ...CustomerDocs.paths,
    },
  },
  apis: [
    './src/controllers/authForCooker.js',
    './src/controllers/authForCustomer.js'
]
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;

