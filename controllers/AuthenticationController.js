const passport = require("passport");

const loginUser = passport.authenticate("local");

function logoutUser(req, res) {
  req.logout();
  res.status(200);
  res.send("Logged out");
}

module.exports = {
  loginUser,
  logoutUser
};
