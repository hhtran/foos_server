var express = require("express");
var router = express.Router();
const {
  indexPosts,
  createPost,
  showPost
} = require("./controllers/PostsController");
const { catchErrors } = require("./errorHandlers");

// Posts
router.get("/posts", catchErrors(indexPosts));
router.post("/posts", catchErrors(createPost));
router.get("/posts/:id", catchErrors(showPost));

module.exports = router;
