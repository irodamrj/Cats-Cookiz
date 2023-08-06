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
                'text/plain': {
                  type: "string",
                  example: "This is about page"
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
                    example: {
                      cooker: { 
                        _id: "64cac5dc6d95cefb18fefe7a",
                        username: "first restaurant",
                        address: "64cac5dc6d95cefb18fefe78",
                        phoneNumber: "1254566522",
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
                      },
                      dishes: [
                        {
                          _id: "64cac6256d95cefb18fefe97",
                          cookerId: "64cac5dc6d95cefb18fefe7a",
                          name: "Pam",
                          description: "string",
                          price: 10,
                          image: "string",
                          createdAt: "2023-08-02T21:09:57.914Z",
                          updatedAt: "2023-08-04T21:53:41.802Z",
                        },
                      ]
                    }
                  },
                },
              },
            },
            '404': {
              description: 'Not Found - cooker not found',
            },
          },
        },
      },
    },
  };
