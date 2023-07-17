module.exports = {
  paths: {
    '/api/cooker': {
      get: {
        tags: ['Cooker'],
        summary: 'Get Cooker',
        description: 'Retrieve Cooker Information',
        responses: {
          200: {
            description: 'Successful response with Cooker details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phonenumber: {
                      type: 'string',
                    },
                    aboutCooker: {
                      type: 'string',
                    },
                    openingHour: {
                      type: 'string',
                    },
                    closingHour: {
                      type: 'string',
                    },
                    address: {
                      type: 'object',
                      properties: {
                        country: {
                          type: 'string',
                          required: true,
                        },
                        city: {
                          type: 'string',
                          required: true,
                        },
                        state: {
                          type: 'string',
                        },
                        zipcode: {
                          type: 'number',
                        },
                        street: {
                          type: 'string',
                          required: true,
                        },
                        buildingNumber: {
                          type: 'number',
                          required: true,
                        },
                        buildingName: {
                          type: 'string',
                        },
                        flatNumber: {
                          type: 'number',
                          required: true,
                        },
                        floor: {
                          type: 'number',
                          required: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      patch: {
        tags: ['Cooker'],
        summary: 'Update Cooker',
        description: 'Update Cooker Information',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  phoneNumber: {
                    type: 'string',
                  },
                  aboutCooker: {
                    type: 'string',
                  },
                  openingHour: {
                    type: 'string',
                  },
                  closingHour: {
                    type: 'string',
                  },
                  address: {
                    type: 'object',
                    properties: {
                      country: {
                        type: 'string',
                        required: true,
                      },
                      city: {
                        type: 'string',
                        required: true,
                      },
                      state: {
                        type: 'string',
                      },
                      zipcode: {
                        type: 'number',
                      },
                      street: {
                        type: 'string',
                        required: true,
                      },
                      buildingNumber: {
                        type: 'number',
                        required: true,
                      },
                      buildingName: {
                        type: 'string',
                      },
                      flatNumber: {
                        type: 'number',
                        required: true,
                      },
                      floor: {
                        type: 'number',
                        required: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated Cooker details',
            content: {
              'application/json': {
                schema: {
                  properties: {
                    phonenumber: {
                      type: 'string',
                    },
                    aboutCooker: {
                      type: 'string',
                    },
                    openingHour: {
                      type: 'string',
                    },
                    closingHour: {
                      type: 'string',
                    },
                    address: {
                      type: 'object',
                      properties: {
                        country: {
                          type: 'string',
                          required: true,
                        },
                        city: {
                          type: 'string',
                          required: true,
                        },
                        state: {
                          type: 'string',
                        },
                        zipcode: {
                          type: 'number',
                        },
                        street: {
                          type: 'string',
                          required: true,
                        },
                        buildingNumber: {
                          type: 'number',
                          required: true,
                        },
                        buildingName: {
                          type: 'string',
                        },
                        flatNumber: {
                          type: 'number',
                          required: true,
                        },
                        floor: {
                          type: 'number',
                          required: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
    '/api/cooker/orders': {
      get: {
        tags: ['Cooker'],
        summary: 'Get Cooker Orders',
        description: 'Retrieve Orders associated with the Cooker',
        responses: {
          200: {
            description: 'Successful response with order list',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      dishes: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                      customerId: {
                        type: 'string',
                        required: true,
                      },
                      cookerId: {
                        type: 'string',
                      },
                      status: {
                        type: 'string',
                        enum: [
                          'Received',
                          'Cancelled',
                          'Delayed',
                          'Completed',
                          'Delivered',
                        ],
                        default: 'Received',
                        required: true,
                      },
                      deliveryAddress: {
                        type: 'string',
                        required: true,
                      },
                      expectedDeliveryTime: {
                        type: 'string',
                        format: 'date-time',
                        required: true,
                      },
                      totalAmount: {
                        type: 'number',
                        default: 0,
                      },
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
    },
    '/api/cooker/orders/{id}': {
      get: {
        tags: ['Cooker'],
        summary: 'Get Order by ID',
        description: 'Retrieve an Order by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the order',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful response with order details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    dishes: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    customerId: {
                      type: 'string',
                      required: true,
                    },
                    cookerId: {
                      type: 'string',
                    },
                    status: {
                      type: 'string',
                      enum: [
                        'Received',
                        'Cancelled',
                        'Delayed',
                        'Completed',
                        'Delivered',
                      ],
                      default: 'Completed',
                      required: true,
                    },
                    deliveryAddress: {
                      type: 'string',
                      required: true,
                    },
                    expectedDeliveryTime: {
                      type: 'string',
                      format: 'date-time',
                      required: true,
                    },
                    totalAmount: {
                      type: 'number',
                      default: 0,
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      patch: {
        tags: ['Cooker'],
        summary: 'Update Order by ID',
        description: 'Update an Order by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the order',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  dishes: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  customerId: {
                    type: 'string',
                    required: true,
                  },
                  cookerId: {
                    type: 'string',
                  },
                  status: {
                    type: 'string',
                    enum: [
                      'Received',
                      'Cancelled',
                      'Delayed',
                      'Completed',
                      'Delivered',
                    ],
                    default: 'Completed',
                    required: true,
                  },
                  deliveryAddress: {
                    type: 'string',
                    required: true,
                  },
                  expectedDeliveryTime: {
                    type: 'string',
                    format: 'date-time',
                    required: true,
                  },
                  totalAmount: {
                    type: 'number',
                    default: 0,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated order details',
            content: {
              'application/json': {
                schema: {
                  properties: {
                    dishes: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    customerId: {
                      type: 'string',
                      required: true,
                    },
                    status: {
                      type: 'string',
                      enum: [
                        'Received',
                        'Cancelled',
                        'Delayed',
                        'Completed',
                        'Delivered',
                      ],
                      default: 'Received',
                      required: true,
                    },
                    deliveryAddress: {
                      type: 'string',
                      required: true,
                    },
                    expectedDeliveryTime: {
                      type: 'string',
                      format: '30min',
                      required: true,
                    },
                    totalAmount: {
                      type: 'string',
                      default: 0,
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
    },
    '/api/cooker/dishes': {
      post: {
        tags: ['Cooker'],
        summary: 'Create Dish',
        description: 'Create a new Dish for the Cooker',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  cookerId: {
                    type: 'string',
                    required: true,
                  },
                  name: {
                    type: 'string',
                    required: true,
                  },
                  description: {
                    type: 'string',
                    required: true,
                  },
                  price: {
                    type: 'number',
                    required: true,
                  },
                  image: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with created dish',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cookerId: {
                      type: 'string',
                      required: true,
                    },
                    name: {
                      type: 'string',
                      required: true,
                    },
                    description: {
                      type: 'string',
                      required: true,
                    },
                    price: {
                      type: 'number',
                      required: true,
                    },
                    image: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      get: {
        tags: ['Cooker'],
        summary: 'Get Cooker Dishes',
        description: 'Retrieve Dishes associated with the Cooker',
        responses: {
          200: {
            description: 'Successful response with dish list',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      cookerId: {
                        type: 'string',
                        required: true,
                      },
                      name: {
                        type: 'string',
                        required: true,
                      },
                      description: {
                        type: 'string',
                        required: true,
                      },
                      price: {
                        type: 'number',
                        required: true,
                      },
                      image: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
    },
    '/api/cooker/dishes/{id}': {
      delete: {
        tags: ['Cooker'],
        summary: 'Delete Dish by ID',
        description: 'Delete a Dish by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the dish',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful deletion message',
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      patch: {
        tags: ['Cooker'],
        summary: 'Update Dish by ID',
        description: 'Update a Dish by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the dish',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  cookerId: {
                    type: 'string',
                    required: true,
                  },
                  name: {
                    type: 'string',
                    required: true,
                  },
                  description: {
                    type: 'string',
                    required: true,
                  },
                  price: {
                    type: 'number',
                    required: true,
                  },
                  image: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated dish details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cookerId: {
                      type: 'string',
                      required: true,
                    },
                    name: {
                      type: 'string',
                      required: true,
                    },
                    description: {
                      type: 'string',
                      required: true,
                    },
                    price: {
                      type: 'number',
                      required: true,
                    },
                    image: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
    },
    '/api/cooker/paymentType': {
      post: {
        tags: ['Cooker'],
        summary: 'Add Payment Type',
        description: 'Add a new Payment Type for the Cooker',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  paymentType: {
                    type: 'object',
                    items: {
                      type: 'string',
                    },
                    enum: ['card', 'cash'],
                    default: 'card',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with added payment type',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    paymentType: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      enum: ['card', 'cash'],
                    },
                  },
                },
              },
              default: {
                description: 'Unexpected error',
              },
            },
          },
        },
      },
    },
  },
};
