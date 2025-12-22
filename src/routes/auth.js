const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../Validators/validation");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();
// const authRouter = express.Router();
// const authRouter = express.Router();

// ⭐ SIGNUP ROUTE
authRouter.post("/signup", async (req, res) => {
    try {
        // Step 1: Validate input
        validateSignupData(req);

        const { name, email, password, age } = req.body;

        // Step 2: Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists!");
        }

        // Step 3: Create new user (password will be hashed automatically)
        const user = new User({
            name,
            email,
            password,
            age
        });

        await user.save();

        // Step 4: Send response
        res.send({
            message: "User created successfully!",
            user
        });

    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }
});

// ⭐ LOGIN ROUTE
authRouter.post("/login", async (req, res) => {
    try {
        // Step 1: Validate input
        validateLoginData(req);

        const { email, password } = req.body;

        // Step 2: Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email!");
        }

        // Step 3: Validate password
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            throw new Error("Invalid password!");
        }

        // Step 4: Generate JWT token
        const token = await user.getjwt();

        // Step 5: Send token in cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),  // 8 hours
            httpOnly: true,
            secure:  true  // Only HTTPS
        });

        // Step 6: Send response
        res.send({
            message: "Login successful!",
            user
        });

    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }
});

// ⭐ GET PROFILE ROUTE (Protected)
authRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;  // From middleware
        res.send({
            message: "Here is your profile",
            user
        });
    } catch (err) {
        res.status(400).send({
            error: err.message
        });
    }
});

// ⭐ LOGOUT ROUTE
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.send({ message: "Logged out successfully!" });
});

module.exports = authRouter;