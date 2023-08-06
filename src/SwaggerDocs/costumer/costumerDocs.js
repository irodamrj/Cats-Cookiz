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
                        _id: {
                          type:"string",
                        }, 
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
                          format: 'uuid',
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
                              },                             
                            },
                            total: {
                              type: 'number',                             
                            },
                          },
                        },
                        address: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                            },
                            country: {
                              type: 'string',
                            },
                            city: {
                              type: 'string',
                            },
                            state: {
                              type: 'string',
                            },
                            zipcode: {
                              type: 'number',
                            },
                            street: {
                              type: 'string',
                            },
                            buildingNumber: {
                              type: 'number',
                            },
                            buildingName: {
                              type: 'string',
                            },
                            flatNumber: {
                              type: 'number',
                            },
                            floor: {
                              type: 'number',
                            },
                          },
                        },
                        phoneNumber: {
                          type: 'string',
                        },
                      },
                      example: {
                        _id: "5678zuidfgh87oi6789",
                        firstName: "john",
                        lastName: "Mac",
                        email: "mac@mail.com",
                        password: "f678oiuj89ziiho87uidj",
                        cart:{
                          itemId: ["5678ziutg87"],
                          total: 65,
                          _id: "768ziudhgfj7z8iu"
                        },
                        address: {
                          id: "768uigdfhjbdfzug",
                          country: "Turkey",
                          city: "Istanbul",
                          street: "324 cd",
                          buildingNumber: "667 C",
                          flatNumber: 4,
                          floor: 4,
                        },
                        phoneNumber: "435267578"
                      }
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'You are not authorized ',
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
                  },
                  example: {
                    UpdatedCustomer: {
                      country: "Turkey",
                      city: "Eskisehir",
                      street: "34 Cf",
                      buildingNumber: "13 C",
                      flatNumber: 4,
                      floor: 35
                    } ,
                    phoneNumber: 546274856,
                    firstName:"John",
                    lastName: "Kisi"
                  }
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
              'text/plain': {
                schema: {
                  type: 'string',
                  example: "Your account was Deleted Succesfully"
                },
              },
            },
          },
          400: {
            description: 'You are not authorized ',
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
                      example: {
                        cart : {
                          itemId: ["68674f567464","67895v78r54r"],
                          total: 50,
                          _id:"65876g7r76e4ve546e56"
                        },
                      }
                    },
                  },
                },
              },
            },
          },
          400: {
            description: ' Bad request',
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
                 
                  },
                  example: {
                    itemId: [],
                    total: 0,
                    _Id:"8675g775675"
                  }
                },
              },
            },
          },
          400: {
            description: ' Bad Request',
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
                    UpdatedCustomer: {
                      type: 'object',
                      properties: {
                        _id : {
                          type: "string"
                        },
                        firstname : {
                          type: "string"
                        },
                        lastName : {
                          type: "string"
                        },
                        email : {
                          type: "string"
                        },
                        password : {
                          type: "string"
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
                      },
                    },
                  },
                  example: {
                    _id: "657tguz89u£$",
                    firstName : "example",
                    lastName : "example",
                    email: "example@example.com",
                    password: "$657890dsafffseec3",
                    cart: {
                      itemId:[ 
                        "6457832tjhdg8375",
                        "875734537z32876c7"
                      ],
                      total: 76,
                      id: "76z87zd589o0ui"
                    },
                     address: "64cd331e708dc7849a6ccd4d",
                     phoneNumber: "354678903",
                     profilePicture: "string"
                  }
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
