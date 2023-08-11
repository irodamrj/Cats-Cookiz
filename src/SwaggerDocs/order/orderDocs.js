const { truncateSync } = require("fs");

module.exports = {
  paths: {
    '/api/customer/order/all': {
      get: {
        tags: ['Customer'],
        summary: 'Get All Orders for Customer',
        description: 'Retrieve a list of all orders for a specific customer.',
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  example: {
                    _id: '65789009809hguzttito87g',
                    dishes: [
                      {
                        _id: '567tizugi76ubz',
                        cookerId: '576986tzuig87iu',
                        name: 'Lahmancu',
                        description: 'hot',
                        price: 45,
                        image: '',
                        createdAt: '2023-08-02T21:09:57.914Z',
                        updatedAt: '2023-08-02T21:09:57.914Z',
                      },
                      {
                        _id: '567tizugi76ubz',
                        cookerId: '576986tzuig87iu',
                        name: 'Lahmancu',
                        description: 'hot',
                        price: 45,
                        image: '',
                        createdAt: '2023-08-02T21:09:57.914Z',
                        updatedAt: '2023-08-02T21:09:57.914Z',
                      },
                    ],
                    customerId: '67486tgre6t67t4rg7',
                    cookerId: '576986tzuig87iu',
                    status: 'Completed',
                    deliveryAddress: {
                      _id: '65789pzhi78tbiut',
                      country: 'Turkey',
                      city: 'Istanbul',
                      street: '6576 Cd',
                      buildingNumber: '2 C',
                      flatNumber: 5,
                      floor: 13,
                    },
                    expectedDeliveryTime: '1hr ',
                    totalAmount: 90,
                    isAddressNew: false,
                    createdAt: '2023-08-04T17:21:46.017Z',
                    updatedAt: '2023-08-04T17:21:46.017Z',
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
          },
        },
      },
    },
    '/api/customer/order/{id}': {
      get: {
        tags: ['Customer'],
        summary: 'Get Order by ID for Customer',
        description:
          'Retrieve a single order by its ID for a specific customer.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the order to fetch',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    order: {
                      _id: '67587v76r7r76rv65v4',
                      dishes: [
                        {
                          _id: '767658585v565vb',
                          cookerId: '7655896v68bt7h76b',
                          name: 'Burger',
                          describe: 'zzzzzz',
                          price: 23,
                          image: '4c65c4vtdfztrr',
                          createdAt: '2023-08-02T21:09:57.914Z',
                          updatedAt: '2023-08-02T21:09:57.914Z',
                        },
                      ],
                      customerId: 't6454c765476vb',
                      cookerId: '7655896v68bt7h76b',
                      sttus: 'Completed',
                      deliveryAddress: {
                        _id: '675tv87b6r787ob',
                        country: 'Turkey',
                        city: 'Ankara',
                        street: '33 Cd',
                        buildingNumber: '1 C',
                        flatNumber: 2,
                        floor: 65,
                      },
                      expectedDeliveryTime: '1hr',
                      totalAmount: 40,
                      isAddressNew: false,
                      createdAt: '2023-08-02T21:09:57.914Z',
                      updatedAt: '2023-08-02T21:09:57.914Z',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Invalid order ID',
          },
          404: {
            description: 'Order not found',
          },
        },
      },
    },
    '/api/customer/order': {
      post: {
        tags: ['Customer'],
        summary: 'Create New Order',
        description: 'Create a new order for a customer.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                
                example: {
                  deliveryAddress: {
                    country: 'Your Country',
                    city: 'Your City',
                    zipcode: 6579,
                    street: 'Your Street',
                    buildingNumber: 123,
                    flatNumber: 456,
                    floor: 7,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Order created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    dishes: [
                      '64cac6256d95cefb18fefe97',
                      '64cac6256d95cefb18fefe97',
                    ],
                    customerId: '657tguz89hgsdgsuzdu£$',
                    cookerId: '6578903238hfbds78u',
                    status: 'Recived',
                    deliveryAddress: 'mnbsd67789sdb87zguh',
                    expectedDeliveryTime: '20 minutes',
                    totalAmount: 50,
                    isAddressNew: false,
                    _id: 'z678hjdfj98ihjfd',
                    createdAt: '2023-08-04T17:21:46.017Z',
                    updatedAt: '2023-08-04T17:21:46.017Z',
                  },
                },
              },
            },
          },
          404: {
            description: 'Order cannot be empty',
          },
        },
      },
    },
    '/api/customer/order/{id}/': {
      patch: {
        tags: ['Customer'],
        summary: ' Cancel an order',
        description: 'Cancels an order with the specified ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the order to cancel',
          },
        ],
        responses: {
          200: {
            description:
              'Successful response indicating the order was cancelled',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: 'Order cancelled successfully',
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Invalid order ID',
          },
          404: {
            description: 'Order not found',
          },
        },
      },
    },
    '/api/customer/order/{id}/review': {
      post: {
        tags: ['Customer'],
        summary: 'Create a comment for an order',
        description: 'Creates a new comment for the specified order.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the order to add a comment to',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  rating: {
                    type: 'number',
                    minimum: 1,
                    maximum: 5,
                  },
                  commentText: {
                    type: 'string',
                  },
                },
                required: ['rating', 'commentText'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with the newly created comment',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    comment: {
                      customerId: {
                        _id: '67r876bjhguz76v7r67r',
                      },
                      cookerId: '678765475847b6',
                      commentText: 'This was good',
                      rating: 4,
                      _id: '87bu78eb6t7bebr7r',
                      createdAt: '2023-08-04T20:35:34.731Z',
                      updatedAt: '2023-08-04T20:35:34.731Z',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Invalid data in the request body',
          },
          404: {
            description: 'Order not found',
          },
        },
      },
    },
  },
};
  