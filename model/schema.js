const mongoose = require('mongoose');

const SchemaURL = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: { // Change redirectURL to originalUrl
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model
const URL = mongoose.model('URL', SchemaURL);
module.exports = URL;
