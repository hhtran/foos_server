var express = require("express");
var router = express.Router();
const {
  indexUsers,
  showUser,
  updateUser,
  deleteUser,
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
const { loginUser } = require("./controllers/AuthenticationController");
const { catchErrors } = require("./errorHandlers");

// Users
router.post("/users/login", loginUser, (req, res, next) => {
  res.json(req.user);
});
router.post(
  "/users/register",
  validateRegistration,
  catchErrors(registerUser),
  loginUser,
  (req, res, next) => {
    res.json(req.user);
  }
);
router.get("/users", catchErrors(indexUsers));
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
