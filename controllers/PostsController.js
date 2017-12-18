const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    console.log(file);
    const isPhoto = file.mimetype.startsWith("image/png");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "File type not allowed" });
    }
  }
};

async function indexPosts(req, res, next) {
  const Posts = await Post.find({});
  res.json(Posts);
}

const uploadPost = multer(multerOptions).single("photo");
const resizeImage = async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    next();
    return;
  }

  const extension = req.file.mimetype.split("/")[1];
  req.body.photo = `${uuid.v4()}.${extension}`;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`client/public/uploads/${req.body.photo}`);
  next();
};

async function createPost(req, res, next) {
  const { owner, title, description, photo } = req.body;
  console.log(req);
  const post = new Post({ owner, title, description, photo });

  await post.save();
  res.status(200);
  res.json(`Successfully saved Post ${post}`);
}

async function showPost(req, res, next) {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id });
  res.json(post);
}

async function updatePost(req, res, next) {
  const id = req.params.id;
  const { owner, title, description } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id },
    { owner, title, description },
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
  deletePost,
  uploadPost,
  resizeImage
};
