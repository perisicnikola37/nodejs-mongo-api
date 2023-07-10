const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const { mongoURI, mongoOptions } = require('./lib/mongoConfiguration');
const app = require("./app");

// Port
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, mongoOptions)
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
