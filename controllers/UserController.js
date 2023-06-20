const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require('axios')

const register = async (req, res) => {
    const { username, email, password, description } = req.body;

    const translationOptions = {
        method: 'POST',
        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY || 'default-api-key',
            'X-RapidAPI-Host': process.env.RAPIDAPI_API_HOST || 'default-api-host'
        },
        data: {
            from: process.env.FROM || 'hr',
            to: process.env.TO || 'gb',
            q: description
        }
    };

    try {
        const translationResponse = await axios(translationOptions);
        const response = translationResponse.data[0];

        const user = new User({ username, email, password, description: response });
        await user.save();

        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: `An error occurred while registering the user: ${error.message}` });
    }
};

module.exports = { register };
