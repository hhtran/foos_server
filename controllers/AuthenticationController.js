const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");

const loginUser = passport.authenticate("local");

function logoutUser(req, res) {
  req.logout();
  res.status(200);
  res.send("Logged out");
}

function isAuthenticated(req, res) {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
}

async function forgotPassword(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // TODO: Send them elsewhere
    res.redirect("/login");
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpiration = Date.now() + 3600000; // 1 hr
  await user.save();

  // TODO: send email

  res.redirect("/login");
}

module.exports = {
  loginUser,
  logoutUser,
  forgotPassword
};
