const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require('axios')
const translationOptions = require("../lib/lib")

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

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

const protectedRoute = (req, res) => {
    res.send({
        user: req.user,
        msg: 'Valid session'
    });
};

const logout = (req, res) => {
    res.clearCookie(process.env.JWT_SECRET);
    res.send('Logged out successfully!');
}

module.exports = { allUsers, registerUser, loginUser, deleteUsers, protectedRoute, logout };
