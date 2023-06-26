const express = require('express');
const router = express.Router();
const { allUsers, registerUser, loginUser, deleteUsers, protectedRoute, logout } = require('./../controllers/UserController');
const { authenticateToken } = require('../middleware/middleware');

// Import swagger-jsdoc and swagger-ui-express
const swaggerUi = require('swagger-ui-express');

// Import the Swagger docs file
const swaggerDocs = require('../swagger/swagger-docs');

// Serve Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocs));

router.get('/users', allUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete-users', deleteUsers);
router.get('/protected-route', authenticateToken, protectedRoute);
router.get('/logout', logout);

module.exports = router;
