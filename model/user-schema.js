const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true, // Converts email to lowercase for consistency
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Simple email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields
const User= mongoose.model('User', userSchema)

module.exports = User
