const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('./../controllers/PostController');
const { authenticateToken } = require('../middleware/middleware');

router.get('/posts', getPosts);
router.post('/create-post', authenticateToken, createPost);

module.exports = router;