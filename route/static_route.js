const express = require('express');
const router = express.Router();
const URL = require('../model/schema'); // Ensure this path is correct

router.get('/', async (req, res) => {
    try {
        return res.render('home');
    } catch (error) {
        console.error("Error retrieving URLs:", error);
        return res.render('home', { urls: [], error: "Server error, could not retrieve URLs" });
    }
});

module.exports = router;
