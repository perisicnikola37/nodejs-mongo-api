const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUsers } = require('./../controllers/UserController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete-users', deleteUsers);
// router.delete('/users', users);
// router.get('/logout', logout);
// router.get('/protected', protected);

module.exports = router;
