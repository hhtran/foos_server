const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const promisify = require("es6-promisify");

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

  console.log(req.body);
  const errors = req.validationErrors();
  if (errors) {
    res.status(500);
    res.json({ errors: errors.map(err => err.msg) });
    return;
  }

  next();
}

async function registerUser(req, res, next) {
  const { name, username, password, email } = req.body;
  const user = new User({ name, username, email });

  const registerPromise = promisify(User.register, User);
  registerPromise(user, password);
  await registerPromise(user, password);

  next();
}

async function indexUsers(req, res, next) {
  const users = await User.find({});
  res.json(users);

  next();
}

async function showUser(req, res, next) {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const { name, email } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    { name, email },
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
  showUser,
  updateUser,
  deleteUser,
  showUserPosts,
  validateRegistration,
  registerUser
};
