module.exports = {
  paths: {
    '/api/auth/customer/signup': {
      post: {
        tags: ['Customer'],
        summary: 'Customer Signup',
        description: 'Register a new customer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                  },
                  lastName: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                 type: "object",
                 example: {
                   firstName: "John",
                   lastName: "Mac",
                   email: "john@email.com",
                   password: "$2a$10$m4E0KIFDx9b.O6NU30IKFu9xtmca/knZJm4s3WhtQa75j1fd062Iq",
                   cart: {
                     itemId: ["6789uiofdhjkt7","435678zuighjbnm" ],
                     total: 90,
                     _id: "5678ziufdhjkn98u",
                    },
                
                   _id: "567890uihjgjhztuiuzghjbjhu7iu"
                 },
               },
              },
           },
         },
          400: {
            description:
              'Bad Request - Email already exists or invalid password',
          },
        },
      },
    },
    '/api/auth/customer/login': {
      post: {
        tags: ['Customer'],
        summary: 'Customer Login',
        description: 'Authenticate a customer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
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
                    customer: {
                      properties:{
                        _id: {
                          type: "string",
                        },
                        firstName: {
                          type: "string",
                        },
                        lastName: {
                          type: "string",
                        },
                        email: {
                          type : "string"
                        },
                        password: {
                          type: "string"
                        },
                        cart: {
                          properties: {
                            itemId: [],
                            total: {
                              type: "number"
                            },
                            _id: {
                              type: "string"
                            },
                          }
                        },
                        address: {
                          type: "string"
                        },
                        phoneNumber: {
                          type: "string"
                        },
                        profilePicture: {
                          type:"string"
                        },

                      }
                    }
                  },
                  example: {
                     _id: "64cac7d0edc52cebf1cb42e9",
                     firstName: "Customer",
                     lastName: "Costomer",
                     email: "customer@customer.com",
                     password: "$2a$10$Yu1YlUE7jD0aKOxbQiMxo.MRTT166Q9a/HA0JfpPpxDEOwCEAGR.i",
                     cart: {
                      itemId: [],
                      total: 0,
                      _id: "64cac7d0edc52cebf1cb42e8"
                       },
                    address: "64cac7d6edc52cebf1cb42ee",
                    phoneNumber : "36985212"

                  }
                  
                },
              },
            },
          },
          400: {
            description: 'Bad Request - Please provide email and password',
          },
          401: {
            description: 'Unauthorized - Invalid credentials',
          },
        },
      },
    },
    '/api/auth/customer/logout': {
      get: {
        tags: ['Customer'],
        summary: 'Customer Logout',
        description: 'Log out a customer',
        responses: {
          200: {
            description: 'Successful logout',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
                example: {
                  type: "USER LOGGED OUT"
                }
              },
            },
          },
          401: {
            description: 'Unauthorized - User not logged in',
          },
        },
      },
    },
  },
};
