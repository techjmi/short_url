const express = require('express');
const router = express.Router();
const URL = require('../model/schema'); // Ensure this path is correct

router.get('/', async (req, res) => {
    const urls=await URL.find({})
    console.log('...urls', urls)
    try {
        return res.render('home',{urls});
    } catch (error) {
        console.error("Error retrieving URLs:", error);
        return res.render('home', { urls: [], error: "Server error, could not retrieve URLs" });
    }
});
router.get('/signup', (req,res)=>{
    return res.render('signup')
})
router.get('/login', (req,res)=>{
    return res.render('login')
})
module.exports = router;
