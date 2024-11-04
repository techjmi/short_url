const express = require("express");
const connectToDB = require("./database/db");
const urlRoutes = require('./route/url-route');
const staticRoutes = require('./route/static_route');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Specify the folder where EJS files are stored
app.set('views', path.join(__dirname, 'view'));

// Route Registrations
app.use('/url', urlRoutes); // All routes for URL-related actions
app.use('/', staticRoutes); // Static routes for other actions

// Connect to the database
connectToDB();

// Start the server
app.listen(PORT, () => {
    console.log(`THE SERVER IS RUNNING ON PORT ${PORT}`);
});
