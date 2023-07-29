module.exports = {
  paths: {
    // '/api/auth/customer/google': {
    //   get: {
    //     tags: ['Customer'],
    //     summary: 'Google Authentication Page',
    //     description:
    //       'Redirects the customer to the Google authentication page for sign-in',
    //     responses: {
    //       302: {
    //         description: 'Redirect to Google authentication page',
    //         headers: {
    //           Location: {
    //             schema: {
    //               type: 'string',
    //               description: 'Redirect URL to the Google authentication page',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // '/api/auth/customer/google/callback': {
    //   get: {
    //     tags: ['Customer'],
    //     summary: 'Google Authentication Callback',
    //     description:
    //       'Callback route for handling the Google authentication response',
    //     responses: {
    //       302: {
    //         description: 'Redirect after successful Google authentication',
    //       },
    //       401: {
    //         description: 'Unauthorized - Google authentication failed',
    //       },
    //     },
    //   },
    // },
    // '/api/auth/customer/facebook': {
    //   get: {
    //     tags: ['Customer'],
    //     summary: 'Facebook Authentication Page',
    //     description:
    //       'Redirects the customer to the Facebook authentication page for sign-in',
    //     responses: {
    //       302: {
    //         description: 'Redirect to Facebook authentication page',
    //       },
    //     },
    //   },
    // },
    // '/api/auth/customer/facebook/callback': {
    //   get: {
    //     tags: ['Customer'],
    //     summary: 'Facebook Authentication Callback',
    //     description:
    //       'Callback route for handling the Facebook authentication response',
    //     responses: {
    //       302: {
    //         description: 'Redirect after successful Facebook authentication',
    //       },
    //       401: {
    //         description: 'Unauthorized - Facebook authentication failed',
    //       },
    //     },
    //   },
    // },
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
