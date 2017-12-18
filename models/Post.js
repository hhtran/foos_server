const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date
});

postSchema.pre("save", function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
