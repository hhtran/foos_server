const mongoose = require("mongoose");
const Post = mongoose.model("Post");

async function indexPosts(req, res, next) {
  const Posts = await Post.find({});
  res.json(Posts);
}

async function createPost(req, res, next) {
  const { owner } = req.body;
  const post = new Post({ owner });

  await post.save();
  res.status = 200;
  res.json(`Successfully saved Post ${post}`);
}

async function showPost(req, res, next) {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id });
  res.json(post);
}

async function updatePost(req, res, next) {
  const id = req.params.id;
  const { owner } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id },
    { owner },
    { new: true, runValidators: true } // Important because valdiations are run only on creation by default
  );

  res.json(post);
}

async function deletePost(req, res, next) {
  const id = req.params.id;
  const post = await Post.findOneAndRemove({ id });
  res.json(post);
}

module.exports = {
  indexPosts,
  createPost,
  showPost,
  updatePost,
  deletePost
};
