var express = require("express");
var router = express.Router();

/* GET users listing. */
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
