const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Step 1: Get token from cookies
        const { token } = req.cookies;
        
        if (!token) {
            throw new Error("Not a valid token!");
        }

        // Step 2: Verify the token
        const decodedObj = await jwt.verify(token, "999@Akshad");
        const { _id } = decodedObj;

        // Step 3: Find user in database
        const user = await User.findById(_id);
        
        if (!user) {
            throw new Error("User not found");
        }

        // Step 4: Attach user to request object
        req.user = user;

        // Step 5: Move to next middleware/route
        next();

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = { userAuth };