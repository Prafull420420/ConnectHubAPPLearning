const validator = require("validator");

const validateSignupData = (req) => {
    const { name, email, password, age } = req.body;

    // Check if firstName and lastName are provided
    if (!name) {
        throw new Error("Enter a valid first or last name");
    }

    // Check if email is valid format
    if (!validator.isEmail(email)) {
        throw new Error("Enter a valid Email ID");
    }

    // Check if password is strong enough
    if (! validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validateLoginData = (req) => {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
        throw new Error("Enter a valid Email ID");
    }

    // Check if password is provided
    if (!password) {
        throw new Error("Enter a password");
    }
};

module.exports = {
    validateSignupData,
    validateLoginData
};