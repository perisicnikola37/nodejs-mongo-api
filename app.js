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

// User routes
app.use("/api/v1", userRoutes);

// Main route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

module.exports = app;
