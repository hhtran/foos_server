var express = require("express");
var router = express.Router();
const {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser,
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

// Dogs
router.get("/dogs", function(req, res, next) {
  res.json([
    {
      username: "bit la"
    },
    {
      username: "casey"
    }
  ]);
});

module.exports = router;
