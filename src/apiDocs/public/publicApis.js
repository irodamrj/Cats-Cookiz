module.exports = {
    paths: {
      '/home': {
        get: {
          tags: ['Public'],
          summary: 'Get all dishes',
          description: 'Retrieve a list of all dishes.',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      dishes: {
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
              },
            },
          },
        },
      },
      '/home/dish/{id}/': {
        get: {
          tags: ['Public'],
          summary: 'Get a dish by ID',
          description: 'Retrieve a specific dish by its ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the dish to retrieve',
              required: true,
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
                      dish: {
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
              },
            },
            '404': {
              description: 'Not Found - Dish not found',
            },
          },
        },
      },
      '/home/about': {
        get: {
          tags: ['Public'],
          summary: 'About page',
          description: 'Retrieve the content of the about page.',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
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
      '/home/cookers': {
        get: {
          tags: ['Public'],
          summary: 'Get all cookers',
          description: 'Retrieve a list of all cookers.',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      cookers: {
                        type: 'array',
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
              },
            },
          },
        },
      },
      '/home/cookers/{id}': {
        get: {
          tags: ['Public'],
          summary: 'Get a cooker by ID',
          description: 'Retrieve a specific cooker by its ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the cooker to retrieve',
              required: true,
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
                      dishes: {
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
              },
            },
          },
        },
      },
    },
  };
  

