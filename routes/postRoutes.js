const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('./../controllers/PostController');
const { authenticateToken } = require('../middleware/middleware');

// Import swagger-jsdoc and swagger-ui-express
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API',
            version: '1.0.0',
            description: 'API documentation for Node.js API',
        },
    },
    apis: ['./routes/postRoutes.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Successful request
 *       401:
 *         description: Unauthorized
 */

router.get('/posts', getPosts);

/**
 * @swagger
 * /api/v1/create-post:
 *   post:
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: post
 *         description: The post object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Successful post creation
 *       401:
 *         description: Unauthorized
 */

router.post('/create-post', authenticateToken, createPost);


module.exports = router;
