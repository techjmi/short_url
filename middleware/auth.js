// Import the getUser function from the authentication service
const { getUser } = require("../service/auth");

const restricted = async (req, res, next) => {
    // Retrieve the user's UUID from the cookies in the request
    const userUUID = req.cookies.uuid; 
    console.log('..uuid', userUUID)
    
    // Check if UUID is missing; if so, redirect to the login page
    if (!userUUID) {
        return res.redirect('/login');
    }

    try {
        // Attempt to retrieve the user data using the UUID
        const userData = await getUser(userUUID);
        console.log('user data', userData)
        
        // If no user is found, redirect to the login page
        if (!userData) {
            return res.redirect('/login');
        }
        
        // Attach the retrieved user data to the request object for future use
        req.user = userData;
        next()

    } catch (error) {
        // Log the error if needed (error handling logic can be added here)
        console.error("Error retrieving user data:", error);
    }
};

module.exports = restricted;
