const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Provide a valid email address"],
    },
    description: {
        type: String,
        minlength: 2,
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
})

const User = mongoose.model("user", userSchema)

module.exports = User
