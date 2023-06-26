const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API',
            version: '1.0.0',
            description: 'API documentation for Node.js API',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'The email address of the user'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user'
                        }
                    },
                    required: ['name', 'email', 'password']
                },
                Post: {
                    type: 'object',
                    properties: {
                        user: {
                            type: 'string',
                            description: 'The ID of the user associated with the post',
                        },
                        title: {
                            type: 'string',
                            description: 'The title of the post',
                        },
                        content: {
                            type: 'string',
                            description: 'The content of the post',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The creation date of the post',
                        },
                    }
                }
            }
        }
    },
    apis: [
        './routes/userRoutes.js',
        './routes/postRoutes.js',
        './swagger/swagger-docs.js'
    ],
};

module.exports = swaggerOptions