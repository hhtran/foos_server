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
const {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  validResetToken,
  checkAuthenticated
} = require("./controllers/AuthenticationController");
const { catchErrors } = require("./errorHandlers");

// Users
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

// Account
router.get("/authenticated", checkAuthenticated, (req, res, next) => {
  res.json(req.user);
});
router.post(
  "/account/login",
  loginUser,
  catchErrors((req, res, next) => {
    res.json(req.user);
  })
);
router.get("/account/logout", logoutUser);
router.post("/account/forgot", forgotPassword);
router.post("/account/reset/:token", catchErrors(resetPassword));
router.get("/account/valid-reset-token", catchErrors(validResetToken));

// Posts
router.get("/posts", catchErrors(indexPosts));
router.post(
  "/posts",
  checkAuthenticated,
  uploadPost,
  catchErrors(resizeImage),
  catchErrors(createPost)
);
router.get("/posts/:id", catchErrors(showPost));
router.patch("/posts/:id", , checkAuthenticated, catchErrors(updatePost));
router.delete("/posts/:id", checkAuthenticated, catchErrors(deletePost));

module.exports = router;
