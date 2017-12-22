const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

// Middleware
function validateRegistration(req, res, next) {
  req.sanitizeBody("name");
  req.sanitizeBody("username");
  req.sanitizeBody("password");
  req.sanitizeBody("password-confirm");
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.checkBody("name", "You must supply a name").notEmpty();
  req.checkBody("username", "You must supply a username").notEmpty();
  req
    .checkBody("email", "That email is not valid")
    .notEmpty()
    .isEmail();
  req.checkBody("password", "Password cannot be blank").notEmpty();
  req
    .checkBody("password-confirm", "Confirmed password cannot be blank")
    .notEmpty();
  req
    .checkBody("password-confirm", "Your passwords do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.status(500);
    res.json({ errors: errors.map(err => err.msg) });
    return;
  }

  // next();
}

async function registerUser(req, res, next) {
  res.json("hello");
}

async function indexUsers(req, res, next) {
  const users = await User.find({});
  res.json(users);
}

async function createUser(req, res, next) {
  const { name, username, password, email } = req.body;
  const user = new User({ name, username, password, email });

  await user.save();
  res.status(200);
  res.json(`Successfully saved user ${username}`);
}

async function showUser(req, res, next) {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const { name, password, email } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    { name, password, email },
    { new: true, runValidators: true } // Important because valdiations are run only on creation by default
  );

  res.json(user);
}

async function deleteUser(req, res, next) {
  const username = req.params.username;
  const user = await User.findOneAndRemove({ username });
  res.json(user);
}

async function showUserPosts(req, res, next) {
  const username = req.params.username;
  const posts = await Post.find({ owner: username });
  res.json(posts);
}

module.exports = {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser,
  showUserPosts,
  validateRegistration,
  registerUser
};
