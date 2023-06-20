const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json())
app.use(cookieParser());

// Use routes
app.use("/api/v1", userRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully!');
});

// app.get('/protected', authenticateToken, (req, res) => {
//     res.send({
//         user: req.user,
//         msg: 'Valid session'
//     });
// });

module.exports = app;
