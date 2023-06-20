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
app.use("/", userRoutes);

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Access token not provided.');
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
        if (error) {
            res.status(500).json({
                msg: 'Invalid token',
                status: 'Auth not valid'
            });
            return;
        }

        const user = await User.findOne({ username: decodedToken.username });

        if (!user) {
            res.status(404).json({
                msg: 'User not found',
                status: 'Auth not valid'
            });
            return;
        }

        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid username or password.');
                return;
            }

            if (user.password !== password) {
                res.status(401).send('Invalid username or password.');
                return;
            }

            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.cookie('token', token, { httpOnly: true });
            res.send({ token });
        })
        .catch((error) => {
            console.error('Error authenticating user', error);
            res.status(500).send('An error occurred while authenticating user.');
        });
});

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

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully!');
});

app.get('/protected', authenticateToken, (req, res) => {
    res.send({
        user: req.user,
        msg: 'Valid session'
    });
});

module.exports = app;
