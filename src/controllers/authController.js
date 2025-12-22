const bcrypt = require("bcryptjs");
const User = require("../models/user");
const validateSignupData = require("../utils/validateSignupData");

// SIGNUP
const signup = async (req, res) => {
  try {
    validateSignupData(req);

    const { name, email, password, age } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      age
    });

    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, login };
