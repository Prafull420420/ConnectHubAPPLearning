const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
//const { validateEditFields } = require("../utils/validation");
const { validateSignupData, validateLoginData ,validateEditFields} = require("../Validators/validation");

//profile API to get the profile details
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditFields(req)) throw new Error("Invalid Edit request");

    const user = req.user;
    Object.keys(req.body).forEach(key => user[key] = req.body[key]);
    await user.save();

    res.json({
      message: `${user.firstName}, your profile updated successfully`,
      data: user
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
