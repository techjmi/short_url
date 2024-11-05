const User = require("../model/user-schema");
const { v4: uuidv4 } = require('uuid');
const{setUser, getUser}= require('../service/auth')
const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const isEmail = await User.findOne({ email });
        if (isEmail) {
            return res.status(400).json({ message: "Email already in use" });
        }
        // Create a new user if the email is not already taken
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Respond with success and the created user's details (without password)
        // res.status(201).json({ message: "User created successfully", user: { name: newUser.name, email: newUser.email } });
       return res.render('home')
    } catch (error) {
        // Catch any errors and send a 500 response
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists with the provided email and password
        const user = await User.findOne({ email, password });
        
        if (!user) {
            // If no user is found, render the login page with an error message
            return res.render('login', { error: 'Please enter a valid email or password' });
            // res.redirect('/login')
        }

        // If user is found, redirect to the homepage or dashboard
        const sessionId= uuidv4()
        setUser(sessionId, user)
        res.cookie('uuid',sessionId)
        return res.redirect('/');
    } catch (error) {
        // Handle any potential errors during the process
        console.error("Error during login:", error);
        // return res.render('login', { error: 'An error occurred during login. Please try again.' });
        res.redirect('/login')
    }
};

module.exports = {handleUserSignup, handleLogin};
