const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUsers, protectedRoute, logout } = require('./../controllers/UserController');
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
    apis: ['./routes/userRoutes.js'], // Specify the file containing the API operations
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request data
 */

router.post('/register', registerUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */

router.post('/login', loginUser);

/**
 * @swagger
 * /api/v1/delete-users:
 *   delete:
 *     summary: Delete all users
 *     responses:
 *       200:
 *         description: Successful deletion
 *       401:
 *         description: Unauthorized
 */

router.delete('/delete-users', deleteUsers);

/**
 * @swagger
 * /api/v1/protected-route:
 *   get:
 *     summary: Protected route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful request
 *       401:
 *         description: Unauthorized
 */

router.get('/protected-route', authenticateToken, protectedRoute);

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Log out user
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */

router.get('/logout', logout);

module.exports = router;
