const mongoose = require('mongoose');

// Use URL-encoded password in the connection string
const url = "mongodb+srv://contactshamim62:Koltech%40123@cluster0.xelnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connection successful with database');
    } catch (error) {
        console.log('Connection failed with db', error.message);
    }
};

module.exports = connectToDB;
