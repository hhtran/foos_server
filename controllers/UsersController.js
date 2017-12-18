const mongoose = require("mongoose");
const User = mongoose.model("User");

function indexUsers(req, res, next) {
  User.find({}).then(users => {
    res.json(users);
  });
}

function createUser(req, res, next) {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });

  return user.save().then(() => {
    res.status = 200;
    res.json(`Successfully saved user ${username}`);
  });
}

function showUser(req, res, next) {
  const username = req.params.username;
  return User.findOne({ username }).then(user => {
    res.json(user);
  });
}

function updateUser(req, res, next) {
  const username = req.params.username;
  const { name, password } = req.body;
  User.findOneAndUpdate({ username }, { name, password }).then(user => {
    res.json(user);
  });
}

function deleteUser(req, res, next) {
  const username = req.params.username;
  User.findOneAndRemove({ username }).then(user => {
    res.json(user);
  });
}

module.exports = {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser
};
