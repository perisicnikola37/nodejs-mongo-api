const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require('axios')
const translationOptions = require("../lib/lib")

const registerUser = async (req, res) => {
    const { username, email, password, description } = req.body;

    translationOptions.data.q = description;

    try {
        // old way
        // const translationResponse = await axios(translationOptions);
        // const response = translationResponse.data[0];

        // updated way
        const { data: [response] } = await axios(translationOptions);

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email address is already registered' });
        }

        // Store user
        const user = new User({ username, email, password, description: response });
        await user.save();

        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: `An error occurred while registering the user: ${error.message}` });
    }
};

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Access token not provided.');
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'token', async (error, decodedToken) => {
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

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }).select('+password')
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
};

const deleteUsers = async (req, res) => {
    User.deleteMany({})
        .then(() => {
            res.send('Users collection emptied successfully!');
        })
        .catch((error) => {
            console.error('Error emptying users collection', error);
            res.status(500).send('An error occurred while emptying users collection.');
        });
};

module.exports = { registerUser, loginUser, deleteUsers };
