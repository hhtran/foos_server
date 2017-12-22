const passport = require("passport");

const loginUser = passport.authenticate("local");

module.exports = {
  loginUser
};
