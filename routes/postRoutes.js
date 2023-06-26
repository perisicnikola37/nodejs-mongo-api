const express = require('express');
const router = express.Router();
const { getPosts, userPosts, createPost } = require('./../controllers/PostController');
const { authenticateToken } = require('../middleware/middleware');

// Import swagger-jsdoc and swagger-ui-express
const swaggerUi = require('swagger-ui-express');

// Import the Swagger docs
const swaggerDocs = require('../swagger/swagger-docs');

// Serve Swagger UI
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocs));

router.get('/posts', getPosts);
router.get('/user-posts/:id', userPosts);
router.post('/create-post', authenticateToken, createPost);

module.exports = router;
