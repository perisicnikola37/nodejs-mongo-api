const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('./../controllers/PostController');
const { authenticateToken } = require('../middleware/middleware');

// Import swagger-jsdoc and swagger-ui-express
const swaggerUi = require('swagger-ui-express');

// Import the Swagger docs
const swaggerDocs = require('../swagger-docs');

// Serve Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocs));

router.get('/posts', getPosts);
router.post('/create-post', authenticateToken, createPost);

module.exports = router;
