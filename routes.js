var express = require("express");
var router = express.Router();
const {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser
} = require("./controllers/UsersController");

// Users
router.get("/users", indexUsers);
router.post("/users", createUser);
router.get("/users/:username", showUser);
router.patch("/users/:username", updateUser);
router.delete("/users/:username", deleteUser);

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
