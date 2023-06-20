const express = require('express');
const app = require("./app");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios')
require('dotenv').config();

// Port
const port = 3000;

// Models
const User = require('./models/userModel');

// MongoDB connection
const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });


// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
