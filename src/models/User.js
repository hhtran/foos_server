const mongoose = require("mongoose");
const validator = require("validator");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: "Please supply a name",
    trim: true
  },
  username: {
    type: String,
    required: "Please supply a username",
    trim: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    trim: true,
    required: "Please supply an email address",
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid Email Address"]
  },
  admin: Boolean,
  location: String,
  created_at: Date,
  updated_at: Date,
  resetPasswordToken: String,
  resetPasswordExpiration: Date
});

userSchema.pre("save", function(next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

userSchema.plugin(passportLocalMongoose, { usernameField: "username" });
userSchema.plugin(mongodbErrorHandler);

const User = mongoose.model("User", userSchema);

module.exports = User;
