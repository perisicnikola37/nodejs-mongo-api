const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Middleware
app.use(express.json())
app.use(cookieParser());

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

// Main route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

module.exports = app;
