module.exports = {
    paths: {
      '/api/auth/admin/login': {
        post: {
          tags: ['Admin'],
          summary: 'Admin Login',
          description: 'Admin Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      required: true,
                    },
                    password: {
                      type: 'string',
                      required: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Successful login',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    description: 'Username of the authenticated Admin',
                    properties: {
                        username: {
                          type: 'string',
                          required: true,
                        },
                        password: {
                          type: 'string',
                          required: true,
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
              description: 'Unauthorized - Invalid Credentials',
            },
            default: {
              description: 'Unexpected error',
            },
          },
        },
      },
      '/api/auth/admin/logout': {
        get: {
          tags: ['Admin'],
          summary: 'Admin Logout',
          description: 'Log out an authenticated Admin',
          responses: {
            200: {
              description: 'Successful logout',
            },
            default: {
              description: 'Unexpected error',
            },
          },
        },
      },
    },
  };
  