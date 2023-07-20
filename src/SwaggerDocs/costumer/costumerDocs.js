module.exports = {
  paths: {
    '/api/customer': {
      get: {
        tags: ['Customer'],
        summary: 'Get Customer Profile',
        description: 'Retrieve Customer Information',
        responses: {
          200: {
            description: 'Successful response with Customer details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    customer: {
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
                          minLength: 6,
                        },
                        phoneNumber: {
                          type: 'string',
                        },
                        providerId: {
                          type: 'string',
                        },
                        profilePicture: {
                          type: 'string',
                        },
                        cart: {
                          type: 'object',
                          properties: {
                            itemId: {
                              type: 'array',
                              items: {
                                type: 'string',
                                format: 'uuid',
                              },
                              required: true,
                            },
                            total: {
                              type: 'number',
                              required: true,
                            },
                          },
                        },
                        address: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              format: 'uuid',
                            },
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
            },
          },
        },
      },
      patch: {
        tags: ['Customer'],
        summary: 'Update Customer Profile',
        description: 'Update Customer Information',
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
                  profilePicture: {
                    type: 'string',
                  },
                  firstName: {
                    type: 'string',
                  },
                  lastName: {
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
            description: 'Successful response with updated Customer details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phoneNumber: {
                      type: 'string',
                    },
                    profilePicture: {
                      type: 'string',
                    },
                    firstName: {
                      type: 'string',
                    },
                    lastName: {
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
      delete: {
        tags: ['Customer'],
        summary: 'Delete Customer',
        description: 'Delete Customer Profile and Logout',
        responses: {
          200: {
            description: 'Successful response indicating user is deleted and logged out',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
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
    '/api/customer/cart': {
      get: {
        tags: ['Customer'],
        summary: 'Get Customer Cart',
        description: 'Retrieve Customer Cart Information',
        responses: {
          200: {
            description: 'Successful response with Customer cart details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    customer: {
                      type: 'object',
                      properties: {
                        cart: {
                          type: 'object',
                          properties: {
                            itemId: {
                              type: 'array',
                              items: {
                                type: 'string',
                                format: 'uuid',
                              },
                              required: true,
                            },
                            total: {
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
            },
          },
          default: {
            description: 'Unexpected error',
          },
        },
      },
      patch: {
        tags: ['Customer'],
        summary: 'Reset Customer Cart',
        description: 'Reset Customer Cart by emptying the cart items and setting the total to zero.',
        responses: {
          200: {
            description: 'Successful response with the updated Customer cart',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cart: {
                      type: 'object',
                      properties: {
                        itemId: {
                          type: 'array',
                          items: {
                            type: 'string',
                            format: 'uuid',
                          },
                          required: true,
                        },
                        total: {
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
      post: {
        tags: ['Customer'],
        summary: 'Create Customer Cart',
        description: 'Add items to the Customer cart',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  itemId: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'uuid',
                    },
                    required: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with the updated Customer cart',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    updatedCustomer: {
                      type: 'object',
                      properties: {
                        cart: {
                          type: 'object',
                          properties: {
                            itemId: {
                              type: 'array',
                              items: {
                                type: 'string',
                                format: 'uuid',
                              },
                              required: true,
                            },
                            total: {
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
            },
          },
          400: {
            description: 'Bad Request',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
  },
};
