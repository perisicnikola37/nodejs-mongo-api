const express = require('express');
const router = express.Router();
const { register, deleteUsers } = require('./../controllers/UserController');

router.post('/register', register);
router.delete('/delete-users', deleteUsers);
// router.get('/login', login);
// router.delete('/users', users);
// router.get('/logout', logout);
// router.get('/protected', protected);

module.exports = router;
