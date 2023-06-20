const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require('axios')
const translationOptions = require("../lib/lib")

const register = async (req, res) => {
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

module.exports = { register, deleteUsers };
