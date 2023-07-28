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
      },
      '/api/admin//order/{id}': {
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
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        required: true,
                      },
                      status: {
                        type: 'string',
                        enum: ['Received', 'Cancelled', 'Delayed', 'Completed', 'Delivered'],
                        default: 'Cancelled',
                        required: true,
                      },
                      customerId: {
                        type: 'string',
                        required: true,
                      },
                      cookerId: {
                        type: 'string',
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
      },
    },
  };
  