const mongoose = require("mongoose");
const User = mongoose.model("User");

async function indexUsers(req, res, next) {
  const users = await User.find({});
  res.json(users);
}

async function createUser(req, res, next) {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });

  await user.save();
  res.status = 200;
  res.json(`Successfully saved user ${username}`);
}

async function showUser(req, res, next) {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.json(user);
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const { name, password } = req.body;
  const user = await User.findOneAndUpdate(
    { username },
    { name, password },
    { new: true, runValidators: true } // Important because valdiations are run only on creation by default
  );

  res.json(user);
}

async function deleteUser(req, res, next) {
  const username = req.params.username;
  const user = await User.findOneAndRemove({ username });
  res.json(user);
}

module.exports = {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser
};
