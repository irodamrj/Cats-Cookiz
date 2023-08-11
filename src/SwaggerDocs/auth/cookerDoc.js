module.exports = {
  paths: {
    '/api/auth/cooker/signup': {
      post: {
        tags: ['Cooker'],
        summary: 'Create New Cooker',
        description: 'Register a new Cooker',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
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
                      street: {
                        type: 'string',
                        required: true,
                      },
                      zipcode: {
                        type: 'number',
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
                },
                example: {
                  username: 'Example',
                  email: 'example@gmail.com',
                  password: 'examplePassword',
                  address: {
                    country: 'Your Country',
                    city: 'Your City',
                    zipcode: 6579,
                    street: 'Your Street',
                    buildingNumber: 123,
                    flatNumber: 456,
                    floor: 7,
                  },
                  phoneNumber: '1234567890',
                  aboutCooker: 'About the cooker',
                  openingHour: '08:00 AM',
                  closingHour: '10:00 PM',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example:{
                    username:"Devid",
                    address:"76586876587dddffs",
                    phoneNumber:543675869708,
                    email: "devid@cooker.com",
                    password: "$54367869bt64e7uih987",
                    averageRating: 0,
                    aboutCooker: "About the cooker",
                    openingHour:"8:00am",
                    closingHour: "21:00pm",
                    status: "Pending",
                    paymentType: "Waiting to approve",
                  }
                },
              },
            },
          },
          400: {
            description: 'Email already exists',
          },
        },
      },
    },
    '/api/auth/cooker/login': {
      post: {
        tags: ['Cooker'],
        summary: 'Cooker Login',
        description: 'Authenticate a Cooker',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: "example@cooker.com"
                  },
                  password: {
                    type: 'string',
                    example: "123456"
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful authentication',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '$u548463rtgz674793',
                    },
                    username: {
                      type: 'string',
                      example: 'example',
                    },
                    address: {
                      type : 'string',
                      example:'576843164gruzejg327',
                    },
                    phoneNumber: {
                      type: 'string',
                      example: '1234567890',
                    },
                    email: {
                      type: 'string',
                      example: 'example@gmail.com',
                    },
                    password: {
                      type: 'string',
                      example: '$3g34884$434hh78eh47/89gj',
                    },
                    averageRating: {
                      type: 'number',
                      example: '0',
                    },
                    aboutCooker: {
                      type: 'string',
                      example: 'About the cooker',
                    },
                    openingHour: {
                      type: 'string',
                      example: '08:00 AM',
                    },
                    closingHour: {
                      type: 'string',
                      example: '10:00 PM',
                    },
                    status: {
                      type: 'string',
                      enum: ["Pending","Approved"],
                      example: "Pending",
                    },
                    paymentType:{
                      type: 'string',
                      example: "card",
                    }
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Invalid credentials',
          },
          401: {
            description: 'Unauthorized - Invalid credentials',
          },
        },
      },
    },
    '/api/auth/cooker/logout': {
      get: {
        tags: ['Cooker'],
        summary: 'Cooker Logout',
        description: 'Logout Cooker',
        responses: {
          200: {
            description: 'Successful logout',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  example: "Cooker Logged out"
                },
              },
            },
          },
          400: {
            description: 'Unauthorized - User must be logged in',
          },
        },
      },
    },
  },
};
