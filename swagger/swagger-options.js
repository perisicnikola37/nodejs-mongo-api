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
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    },
                    required: ['name', 'email', 'password']
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