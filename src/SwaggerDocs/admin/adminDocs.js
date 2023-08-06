module.exports = {
  paths: {
    '/api/admin/cooker/{id}': {
      delete: {
        tags: ['Admin'],
        summary: 'Delete Cooker',
        description: 'Delete a Cooker by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the Cooker',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful deletion message',
            content: {
              'text/plain': {
                type: "string",
                example: "Cooker Was Deleted Succesfully"
            },
          },
          },
          400: {
            description: 'Cooker Id is not existed - unauthorized',
          },
        },
      },
    },
    '/api/admin/customer/{id}': {
      delete: {
        tags: ['Admin'],
        summary: 'Delete Customer',
        description: 'Delete a Customer by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the Customer',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful deletion message',
            content: {
              'text/plain': {
                type: "string",
                example: "Customer Was Deleted Succesfully"
            },
          },
          },
          400: {
            description: 'Customer Id is not found - unauthorized',
          },
        },
      },
    },
    '/api/admin/order/{id}': {
      patch: {
        tags: ['Admin'],
        summary: 'Update Order Status',
        description: 'Update an Order status by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the Order',
            required: true,
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['Received', 'Cancelled', 'Delayed', 'Completed', 'Delivered'],
                    required: true,
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
              'text/plain': {
                type: "string",
                example: "Status of the order with Id: 54687907686ufgtg is updated"
              },
            },
          },
          400: {
            description: 'Bad request - Order Id isnot existed',
          },
        },
      },
    },
    '/api/admin/dishes': {
      get: {
        tags: ['Admin'],
        summary: 'Get Dishes',
        description: 'Get a list of all dishes',
        responses: {
          200: {
            description: 'Successful response with a list of dishes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example:{
                    dishes:[
                      {
                        _id: "64cac6256d95cefb18fefe97",
                        cookerId: {
                          _id:"64cac5dc6d95cefb18fefe7a",
                          userName: "Cooker",
                          address: "67896bt76tb87tb868",
                          phoneNumber: 546789054678,
                          email:"first@gmail.com",
                          password: "45467890'876544",
                          averageRating: 4.5,
                          aboutCooker: "About Cooker",
                          openingHour: "7:00am",
                          closingHour: "22:00pm",
                          status: "Approved",
                          paymentType: [
                            "card"
                          ],
                       },
                       name: "Pam",
                       description: "about dish",
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
        },
      },
    },
    '/api/admin/cookers': {
      get: {
        tags: ['Admin'],
        summary: 'Get Cookers',
        description: 'Get a list of all cookers',
        responses: {
          200: {
            description: 'Successful response with a list of cookers',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    cookers: [
                      {
                        _id: "64cac7d0edc52cebf1cb42e9",
                        userName: "Iroda",
                        address: "e6578g7r768t7",
                        phoneNumber: 36985212,
                        email: "iroda@gmail.com",
                        password: "$2a$10$Yu1YlUE7jD0aKOxbQiMxo.MRTT166Q9a/HA0JfpPpxDEOwCEAGR.i",
                        averageRating: 5,
                        aboutCooker:"About Cooker",
                        openingHour: "8:00pm",
                        closingHour: "21:00pm",
                        status:"Approved",
                        paymentType:[
                          "card"
                        ],
                      }
                    ]
                  }
                },
              },
            },
          },
          400: {
            description: 'Bad request ',
          },
        },
      },
    },
    '/api/admin/customers': {
      get: {
        tags: ['Admin'],
        summary: 'Get Customers',
        description: 'Get a list of all customers',
        responses: {
          200: {
            description: 'Successful response with a list of customers',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    customers: [
                      {
                        _id: "64cac7d0edc52cebf1cb42e9",
                        firstName: "Iroda",
                        lastName: "yılmaz",
                        email: "iroda@gmail.com",
                        password: "$2a$10$Yu1YlUE7jD0aKOxbQiMxo.MRTT166Q9a/HA0JfpPpxDEOwCEAGR.i",
                        cart: {
                          itemId: [],
                          total: 0,
                          _id: "64cac7d0edc52cebf1cb42e8"
                        },
                      address: "64cac7d6edc52cebf1cb42ee",
                      phoneNumber: 36985212
                      }
                    ]
                  }                 
                },
              },
            },
          },
          400: {
            description: 'Bad requested',
          },
        },
      },
    },
  },
};
