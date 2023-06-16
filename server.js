const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
// const mongoURI = 'mongodb+srv://nikola:06032004@cluster0.4uutsny.mongodb.net/vjezbanje';
const mongoURI = 'mongodb+srv://nikola:06032004@cluster0.4uutsny.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// User Model
const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
});


// Routes
app.get('/', (req, res) => {
    res.send('Hello, API!');
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    user.save()
        .then(() => {
            res.send('User registered successfully!');
        })
        .catch((error) => {
            console.error('Error registering user', error);
            res.status(500).send('An error occurred while registering user.');
        });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username, password })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid username or password.');
                return;
            }

            const token = jwt.sign({ username, role: user.role }, 'secret_key');
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


// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.send('Protected route!');
});

// Token authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send('Access token not provided.');
        return;
    }

    jwt.verify(token, 'secret_key', (error, user) => {
        if (error) {
            res.status(403).send('Invalid token.');
            return;
        }

        req.user = user;
        next();
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
