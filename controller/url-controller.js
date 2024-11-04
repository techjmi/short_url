// const { nanoid } = require('nanoid');
const URL = require("../model/schema");
const urlHandler = async (req, res) => {
  // const shortId = nanoid(8); // Generate a unique short ID
  const { nanoid } = await import("nanoid");
  const shortID = nanoid(8);
  try {
    const { url: originalUrl } = req.body; // Extract the original URL from the request body
    console.log(originalUrl);
    // Validate the presence of a URL in the request
    if (!originalUrl) {
      return res.status(400).json({ message: "Please enter a valid URL" });
    }
    // Create a new document in the database
    const newUrl = await URL.create({
      originalUrl, // Store the original URL
      shortID, // Store the generated short ID
      visitHistory: [],
    });
    console.log(newUrl.shortID);
    const urls = await URL.find({});
    // Respond with the new shortened URL information
    // return res.status(201).json({
    //   message: "URL shortened successfully",
    //   data: newUrl,
    // });
    return res.render("home", {
      newUrl,
      urls,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
//const redirect url
const redirect = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Short ID:", shortId);

  try {
    // Find the document by shortID and update visitHistory with the current timestamp
    const urlDoc = await URL.findOneAndUpdate(
      { shortID: shortId },
      { $push: { visitHistory: { timestamp: new Date() } } },
      { new: true } // Returns the updated document
    );
    // If URL document is not found, send a 404 response
    if (!urlDoc) {
      return res.status(404).json({ message: "URL not found" });
    }
    // Redirect the user to the original URL
    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
const analytics = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Short ID:", shortId);

  try {
    // Find the URL document by short ID
    const result = await URL.findOne({ shortID: shortId });

    // Check if the result exists
    if (!result) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    // Return the analytics data
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

//get all url
const getAllUrls = async (req, res) => {
  try {
    // Fetch all URLs from the database
    const urls = await URL.find({});
    console.log("..", urls);
    // Respond with the list of URLs by rendering the 'home' view
    return res.status(200).render("home", { urls });
  } catch (error) {
    console.error("Error retrieving URLs:", error);

    // Respond with an error message if something goes wrong
    return res
      .status(500)
      .render("home", {
        urls: [],
        error: "Server error, could not retrieve URLs",
      });
  }
};

module.exports = { urlHandler, redirect, analytics, getAllUrls };
