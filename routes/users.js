var express = require("express");
var router = express.Router();
const {
  indexUsers,
  createUser,
  showUser,
  updateUser,
  deleteUser
} = require("../controllers/UsersController");

router.get("/", indexUsers);
router.post("/", createUser);
router.get("/:username", showUser);
router.patch("/:username", updateUser);
router.delete("/:username", deleteUser);

module.exports = router;
