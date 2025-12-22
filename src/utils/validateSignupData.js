const validator = require("validator");

const validateSignupData = (req) => {
  const { name, email, password, age } = req.body;

  // Validate name
  if (!name) {
    throw new Error("Name is required");
  }



  
  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }
  if (name.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }
  if (name.length > 100) {
    throw new Error("Name must not exceed 100 characters");
  }

  // Validate email
  if (!email) {
    throw new Error("Email is required");
  }
  if (! validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }

  // Validate password
  if (!password) {
    throw new Error("Password is required");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (password.length > 50) {
    throw new Error("Password must not exceed 50 characters");
  }
  if (! validator.isStrongPassword(password, {
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  })) {
    // You can customize this based on your requirements
  }

  // Validate age
  if (!age && age !== 0) {
    throw new Error("Age is required");
  }
  if (!Number.isInteger(age)) {
    throw new Error("Age must be a number");
  }
  if (age < 18) {
    throw new Error("Age must be at least 18");
  }
  if (age > 100) {
    throw new Error("Age must not exceed 100");
  }
};

module.exports = validateSignupData;