const express = require("express");

//const User = require("../models/User");
const User= require("../models/user");
const { signup, login } = require("../Controllers/authcontroller");
const router = express.Router();
/**
 * POST /signup
 * Create a new user
 */
router.post("/signup", signup);
router.post("/login", login);
// router.post("/signup", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.send("User added successfully");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

/**
 * GET /feed
 * Get all users
 */
router.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

/**
 * GET /user
 * Get user by email
 */
router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
module.exports = router;