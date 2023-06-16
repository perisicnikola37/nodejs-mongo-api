const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

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

        console.log(decodedToken, "DEKODIRANI TOKEN")
        // Verify token version

        const user = await User.findOne({ username: decodedToken.username })

        res.status(200).json({
            user,
            msg: "Valid session"
        })



        // User.findOne({ username: decodedToken.username })
        //     .then((user) => {
        //         if (!user || user.tokenVersion !== decodedToken.tokenVersion) {
        //             res.status(403).send('Invalid token.');
        //             return;
        //         }

        //         req.user = decodedToken;
        //         next();
        //     })
        //     .catch((error) => {
        //         console.error('Error verifying token', error);
        //         res.status(500).send('An error occurred while verifying token.');
        //     });
    });
}

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
// Login route
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

// Token authentication middleware



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
