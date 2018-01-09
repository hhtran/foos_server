const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const promisify = require("es6-promisify");
const mail = require("../handlers/mail");

const loginUser = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({
        errors: ["Please log in."],
        redirectUrl: `http://${req.headers.host}/login`
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.status(401).json({ redirectUrl: `http://${req.headers.host}/` });
    });
  })(req, res, next);
};

function logoutUser(req, res) {
  req.logout();
  res.status(200);
  res.send("Logged out");
}

function isAuthenticated(req, res) {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(403).json({ errors: ["Please log in."], redirectUrl: "/login" });
}

async function forgotPassword(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // TODO: Send them elsewhere
    res.status(403).json({ redirectUrl: "/login" });
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpiration = Date.now() + 3600000; // 1 hr
  await user.save();

  const resetUrl = `http://${req.headers.host}/account/reset/${
    user.resetPasswordToken
  }`;

  // TODO: send email
  await mail.send({
    filename: "ForgotPassword",
    user,
    subject: "Password Reset",
    resetUrl
  });

  res.status(403).json({ redirectUrl: "/login" });
}

async function validResetToken(req, res) {
  res.json(req.params);
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiration: { $gt: Date.now() }
  }).exec();

  if (!user) {
    res.status(401);
    res.json({
      errors: ["Password reset is invalid or has expired"]
    });
  }
  res.status(200);
  res.send("Valid reset token");
}

async function confirmPasswordsMatch(req, res) {
  if (req.body.password === req.body["password-confirm"]) {
    next();
    return;
  }

  res.status(400);
  res.json({
    errors: ["Passwords do not match"]
  });
}

async function resetPassword(req, res) {
  // res.json(req.params);
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiration: { $gt: Date.now() }
  });

  if (!user) {
    res.status(401);
    res.json({
      errors: ["Password reset is invalid or has expired"]
    });
  }

  const { email, newPassword } = req.body;
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiration = undefined;
  const updatedUser = await user.save();

  res.status(403).json({ redirectUrl: "/login", user: updatedUser });
}

module.exports = {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  validResetToken
};
