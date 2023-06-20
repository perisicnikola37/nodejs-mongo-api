const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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

module.exports = { authenticateToken };
