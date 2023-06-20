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

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Access token not provided.');
        return;
    }

    jwt.verify(token, 'token', async (error, decodedToken) => {

        if (error !== null && error !== undefined) {
            res.status(500).json({
                msg: 'Invalid token',
                status: "Auth not valid"
            });
            return;
        }

        const user = await User.findOne({ username: decodedToken.username })

        res.status(200).json({
            user,
            msg: "Valid session"
        })
    });
}

// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

// // Register route
// app.post('/register', async (req, res) => {
//     const { username, email, password, description } = req.body;

//     const translationOptions = {
//         method: 'POST',
//         url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': 'bcfdee6c9dmsh4e3903236f08f3ep1ec2e0jsn25dfcc1e60d7',
//             'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
//         },
//         data: {
//             from: 'hr',
//             to: 'ar',
//             q: description
//         }
//     };

//     try {
//         const translationResponse = await axios.request(translationOptions);
//         const response = translationResponse.data[0];

//         const user = new User({ username, email, password, description: response });
//         user.save()
//             .then(() => {
//                 res.send('User registered successfully!');
//             })
//             .catch((error) => {
//                 console.error('Error registering user', error);
//                 res.status(500).send('An error occurred while registering user.');
//             });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while translating the description.');
//     }
// });


// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid username or password.');
                return;
            }

            if (user.password !== password) {
                // User's password is incorrect
                res.status(401).send('Invalid username or password.');
                return;
            }

            // Generate a new token
            const tokenVersion = user.tokenVersion || 0;
            const token = jwt.sign({ username, role: user.role, tokenVersion }, 'token');

            // Set the token in a cookie named "token" with an expiration of 30 days
            const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
            res.cookie('token', token, { expires: expirationDate });

            res.send({ token });
        })
        .catch((error) => {
            console.error('Error authenticating user', error);
            res.status(500).send('An error occurred while authenticating user.');
        });
});

// Empty users collection route
app.delete('/users', (req, res) => {
    User.deleteMany({})
        .then(() => {
            res.send('Users collection emptied successfully!');
        })
        .catch((error) => {
            console.error('Error emptying users collection', error);
            res.status(500).send('An error occurred while emptying users collection.');
        });
});

// Logout route
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully!');
});


// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.send('HELLO WORLD!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
