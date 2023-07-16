const swaggerJsdoc = require('swagger-jsdoc');
const cookerDoc = require('./auth/cookerDoc');
const CustomerDocs = require('./auth/customerDocs');
const cookerApiDoc = require('./cooker/cookerDocs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cookiz API Docs For Auth',
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
      ...cookerApiDoc.paths,
    },
  },
  apis: [
    './src/controllers/authForCooker.js',
    './src/controllers/authForCustomer.js',
    './src/controllers/cookers.js',
  ],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
