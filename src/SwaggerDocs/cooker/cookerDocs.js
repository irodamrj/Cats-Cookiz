module.exports = {
  paths: {
    '/api/cooker': {
      get: {
        tags: ['Cooker'],
        summary: 'Get Cooker Profile',
        description: 'Retrieve Cooker Information',
        responses: {
          200: {
            description: 'Successful response with Cooker details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    cooker: {                  
                      _id: "64cac5dc6d95cefb18fefe7a",
                      username: "first restaurant",
                      address: {
                        _id: "64cac5dc6d95cefb18fefe78",
                        country: "Turkey",
                        city: "Eskişehir",
                        state: "NY",
                        zipcode: 12345,
                        street: "Main Street",
                        buildingNumber: "123",
                        buildingName: "ABC Building",
                        flatNumber: 4,
                        floor: 2,
                      },
                      phoneNumber: 1254566522,
                      email: "first@gmail.com",
                      password: "$2a$10$BFZnsYTwJKVq/J3utCGty.QVo7kB6yWLZxc9FuxvA0N4e8YukJ9Iq",
                      averageRating: 4.5,
                      aboutCooker: "about cooker",
                      openingHour: "10.00",
                      closingHour: "24.00",
                      status: "Approved",
                      paymentType: [
                        "card"
                      ],
                    }
                  } 
                },
              },
            },
          },
          400: {
            description: 'Bad request',
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
                    type: 'number',
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
                 type: "object",
                 example: {                
                  _id: "64cac5dc6d95cefb18fefe7a",
                  username: "first restaurant",
                  address: "64cac5dc6d95cefb18fefe78",
                  phoneNumber: 1254566522,
                  email: "first@gmail.com",
                  password: "$2a$10$BFZnsYTwJKVq/J3utCGty.QVo7kB6yWLZxc9FuxvA0N4e8YukJ9Iq",
                  averageRating: 4.5,
                  aboutCooker: "string",
                  openingHour: "string",
                  closingHour: "string",
                  status: "Approved",
                  paymentType: [
                    "card"
                  ],
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
                  type: 'object',
                  example: {
                    _id: "65789009809hguzttito87g",
                    dishes: [
                      { 
                       _id: "567tizugi76ubz",
                       cookerId: "576986tzuig87iu",
                       name: "Lahmancu",
                       description: "hot",
                       price: 45,
                       image: "",
                       createdAt: "2023-08-02T21:09:57.914Z",
                       updatedAt: "2023-08-02T21:09:57.914Z"
                      },
                      { 
                        _id: "567tizugi76ubz",
                        cookerId: "576986tzuig87iu",
                        name: "Lahmancu",
                        description: "hot",
                        price: 45,
                        image: "",
                        createdAt: "2023-08-02T21:09:57.914Z",
                        updatedAt: "2023-08-02T21:09:57.914Z"
                       }
                    ],
                    customerId: "67486tgre6t67t4rg7",
                    cookerId:"576986tzuig87iu",
                    status: "Completed",
                    deliveryAddress: {
                      _id: "65789pzhi78tbiut",
                      country: "Turkey",
                      city: "Istanbul",
                      street: "6576 Cd",
                      buildingNumber: "2 C",
                      flatNumber: 5,
                      floor: 13
                    },
                    expectedDeliveryTime: "1hr ",
                    totalAmount: 90,
                    isAddressNew: false,
                    createdAt:"2023-08-04T17:21:46.017Z",
                    updatedAt:"2023-08-04T17:21:46.017Z"
                  }
                },
              },
            },
          },
          400: {
            description: 'There is no Order for this Cooker',
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
                  example: {
                    order: {
                      _id: "67587v76r7r76rv65v4",
                      dishes: [
                        {
                          _id: "767658585v565vb",
                          cookerId: "7655896v68bt7h76b",
                          name: "Burger",
                          describe: "zzzzzz",
                          price: 23,
                          image: "4c65c4vtdfztrr",
                          createdAt:"2023-08-02T21:09:57.914Z",
                          updatedAt: "2023-08-02T21:09:57.914Z" 
                        }
                      ],
                      customerId:"t6454c765476vb",
                      cookerId: "7655896v68bt7h76b",
                      sttus: "Completed",
                      deliveryAddress: {
                        _id:"675tv87b6r787ob",
                        country: "Turkey",
                        city: "Ankara",
                        street: "33 Cd",
                        buildingNumber: "1 C",
                        flatNumber: 2,
                        floor: 65
                      },
                      expectedDeliveryTime: "1hr",
                      totalAmount: 40,
                      isAddressNew: false,
                      createdAt:"2023-08-02T21:09:57.914Z",
                      updatedAt: "2023-08-02T21:09:57.914Z" 
                    }
                  }
                },
              },
            },
          },
          400: {
            description: ' There is no order for provided Id',
          },
        },
      },
      patch: {
        tags: ['Cooker'],
        summary: 'Update Order status by its ID',
        description: 'Update Order status by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the order',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response with updated order details',
            content: {
              'text/plain': {
                example: "status of the order with Id 64cac70eedc52cebf1cb42a7 is updated to Completed"
              },
            },
          },
          400: {
            description: 'Bad request Order not existed',
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
          201: {
            description: 'Successful response with created dish',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                    example:{
                      newDish: {
                      cookerId: "64cac5dc6d95cefb18fefe7a",
                      name: "Cake",
                      description: "string",
                      price: 10,
                      image: "string",
                      _id: "64cd6fb3053616b57023d6f3",
                      createdAt: "2023-08-04T21:37:55.024Z",
                      updatedAt: "2023-08-04T21:37:55.024Z",
                     }
                    }
                },
              },
            },
          },
          400: {
            description: 'Bad request',
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
                  type: 'object',
                  example:{
                    dishes:[
                      {
                        _id: "64cac6256d95cefb18fefe97",
                        cookerId: "64cac5dc6d95cefb18fefe7a",
                        name: "pide",
                        description: "kıymalı kaşarlı",
                        price: 20,
                        image: "$ug-p6568567607i90io",
                        createdAt: "2023-08-02T21:09:57.914Z",
                        updatedAt: "2023-08-02T21:10:21.695Z"
                      }
                    ]
                  }
                },
              },
            },
          },
          400: {
            description: 'Unauthorized',
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
          400: {
            description: ' dish Id is not existed',
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
              'text/plain': {
                type: "string",
                example: "Dish updated succesfully"
              },
            },
          },
          400: {
            description: 'dish is not existed',
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
              'text/plain': {
                type: "string",
                example: "payment type card added. Current payment options are: card"
                
              },
            },
          },
          400: {
            description: 'Bad requiest',
          },
        },
      },
    },
  },
};
