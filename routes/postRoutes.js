const express = require('express');
const router = express.Router();
const { getPosts } = require('./../controllers/PostController');

router.get('/posts', getPosts);

module.exports = router;