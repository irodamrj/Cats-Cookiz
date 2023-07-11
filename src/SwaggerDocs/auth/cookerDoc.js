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
                    email: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                    username: {
                      type: 'string',
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
            '200': {
              description: 'Successful operation',
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
                    username: {
                      type: 'string',
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
                    } , }, },
                  },
                },
              },
            },
            '400': {
              description: 'Cannot add Cooker',
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
            '200': {
              description: 'Successful authentication',
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
                }
                  },
                },
              },
            },
            '400': {
              description: 'Bad Request - Invalid credentials',
            },
            '401': {
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
            '200': {
              description: 'Successful logout',
              content: {
                'text/plain': {
                  schema: {
                    type: 'string',
                  },
                },
              },
            },
            '400': {
              description: 'Unauthorized - User must be logged in',
            },
          },
        },
      },
    },
  };