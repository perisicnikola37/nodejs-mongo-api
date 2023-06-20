const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUsers, protectedRoute } = require('./../controllers/UserController');
const { authenticateToken } = require('../middleware/middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete-users', deleteUsers);
router.get('/protected-route', authenticateToken, protectedRoute);
// router.get('/logout', logout);

module.exports = router;
