module.exports = {
    paths: {
  '/api/customer/order/all': {
    get: {
      tags: ['Customer'],
      summary: 'Get All Orders for Customer',
      description: 'Retrieve a list of all orders for a specific customer.',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    orderId: {
                      type: 'string',
                    },
                    customerName: {
                      type: 'string',
                    },
                    totalAmount: {
                      type: 'number',
                    },
                    status: {
                      type: 'string',
                      enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
                    },
                    dishes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          dishId: {
                            type: 'string',
                          },
                          dishName: {
                            type: 'string',
                          },
                          price: {
                            type: 'number',
                          },
                        },
                      },
                    },
                    deliveryAddress: {
                      type: 'object',
                      properties: {
                        addressLine1: {
                          type: 'string',
                        },
                        addressLine2: {
                          type: 'string',
                        },
                        city: {
                          type: 'string',
                        },
                        state: {
                          type: 'string',
                        },
                        zipCode: {
                          type: 'string',
                        },
                        country: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Bad Request - Invalid parameters',
        },
      },
    },
  },
    '/api/customer/order/{id}': {
        get: {
          tags: ['Customer'],
          summary: 'Get Order by ID for Customer',
          description: 'Retrieve a single order by its ID for a specific customer.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the order to fetch',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      orderId: {
                        type: 'string',
                      },
                      customerName: {
                        type: 'string',
                      },
                      totalAmount: {
                        type: 'number',
                      },
                      status: {
                        type: 'string',
                        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
                      },
                      dishes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            dishId: {
                              type: 'string',
                            },
                            dishName: {
                              type: 'string',
                            },
                            price: {
                              type: 'number',
                            },
                          },
                        },
                      },
                      deliveryAddress: {
                        type: 'object',
                        properties: {
                          addressLine1: {
                            type: 'string',
                          },
                          addressLine2: {
                            type: 'string',
                          },
                          city: {
                            type: 'string',
                          },
                          state: {
                            type: 'string',
                          },
                          zipCode: {
                            type: 'string',
                          },
                          country: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad Request - Invalid order ID',
            },
            '404': {
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
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Order created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      orderId: {
                        type: 'string',
                      },
                      customerName: {
                        type: 'string',
                      },
                      totalAmount: {
                        type: 'number',
                      },
                      status: {
                        type: 'string',
                        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
                      },
                      dishes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            dishId: {
                              type: 'string',
                            },
                            dishName: {
                              type: 'string',
                            },
                            price: {
                              type: 'number',
                            },
                          },
                        },
                      },
                      deliveryAddress: {
                        type: 'object',
                        properties: {
                          addressLine1: {
                            type: 'string',
                          },
                          addressLine2: {
                            type: 'string',
                          },
                          city: {
                            type: 'string',
                          },
                          state: {
                            type: 'string',
                          },
                          country: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
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
                  schema: {

                    type: 'string',
                  },
                },
              ],
              responses: {
                '200': {
                  description: 'Successful response indicating the order was cancelled',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'string',
                        properties: {
                          message: {
                            type: 'string',
                            example: 'Order cancelled successfully',
                          },
                        },
                      },
                    },
                  },
                },
                '400': {
                  description: 'Bad Request - Invalid order ID',
                },
                '404': {
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
              },responses: {
                '200': {
                  description: 'Successful response with the newly created comment',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          comment: {
                            type: 'object',
                            properties: {
                              _id: {
                                type: 'string',
                                format: 'uuid',
                              },
                              customerId: {
                                type: 'string',
                                format: 'uuid',
                              },
                              cookerId: {
                                type: 'string',
                                format: 'uuid',
                              },
                              rating: {
                                type: 'number',
                                minimum: 1,
                                maximum: 5,
                              },
                              commentText: {
                                type: 'string',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                '400': {
                  description: 'Bad Request - Invalid data in the request body',
                },
                '404': {
                  description: 'Order not found',
                },
              },
            },
          },
    },
  };
  