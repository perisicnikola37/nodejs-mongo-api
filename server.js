const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




