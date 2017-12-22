var express = require("express");
var router = express.Router();
const {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser,
  loginUser,
  validateRegistration,
  registerUser,
  showUserPosts
} = require("./controllers/UsersController");
const {
  indexPosts,
  createPost,
  showPost,
  updatePost,
  deletePost,
  uploadPost,
  resizeImage
} = require("./controllers/PostsController");
const { catchErrors } = require("./errorHandlers");

// Users
router.post("/login", catchErrors(loginUser));
router.post("/register", validateRegistration, catchErrors(registerUser));
router.get("/users", catchErrors(indexUsers));
router.post("/users", catchErrors(createUser));
router.get("/users/:username", catchErrors(showUser));
router.patch("/users/:username", catchErrors(updateUser));
router.delete("/users/:username", catchErrors(deleteUser));
router.get("/users/:username/posts", catchErrors(showUserPosts));

// Posts
router.get("/posts", catchErrors(indexPosts));
router.post(
  "/posts",
  uploadPost,
  catchErrors(resizeImage),
  catchErrors(createPost)
);
router.get("/posts/:id", catchErrors(showPost));
router.patch("/posts.:id", catchErrors(updatePost));
router.delete("/posts/:id", catchErrors(deletePost));

module.exports = router;
