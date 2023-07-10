require('dotenv').config();

// MongoDB connection
const mongoURI = process.env.DATABASE_URL;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = { mongoURI, mongoOptions };
