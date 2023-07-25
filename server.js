const express = require('express');
const mongoose = require('mongoose');
const { mongoURI, mongoOptions } = require('./lib/mongoConfiguration');
const app = require("./app");
const { faker } = require('@faker-js/faker');
const async = require('async');
const User = require('./models/userModel');

// Port
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, mongoOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        generateDummyData();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Function to generate dummy data
async function generateDummyData() {
    const NUM_USERS = 1000;

    // Function to generate a single dummy user
    async function generateDummyUser() {
        const user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            description: faker.lorem.sentence(),
            password: faker.internet.password(),
        });

        await user.save();
        console.log(`User created: ${user.username}`);
    }

    try {
        for (let i = 0; i < NUM_USERS; i++) {
            await generateDummyUser();
        }
        console.log('Dummy data generated.');

        // Close the database connection after generating dummy data
        await mongoose.connection.close();
        console.log('Database connection closed.');

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        mongoose.connect(mongoURI, mongoOptions)
            .then(() => {
                console.log('Connected to MongoDB second time');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB', error);
            });


    } catch (err) {
        console.error('Error generating dummy data:', err);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

