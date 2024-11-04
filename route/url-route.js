const express = require("express");
const { urlHandler, redirect, analytics, getAllUrls } = require("../controller/url-controller");

const router = express.Router();

// Define more specific routes first
router.get('/analytics/:shortId', analytics);
// router.get('/urls', getAllUrls);
// Define dynamic route last
router.get('/:shortId', redirect);

// Define the POST route
router.post('/', urlHandler);

module.exports = router;
