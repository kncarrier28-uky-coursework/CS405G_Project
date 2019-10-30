var express = require("express");
var router = express.Router();

/* GET all users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/:userId", function(req, res, next) {
  // Get user info here (mySQL query)

  res.send("respond with user object from sql query");
});

module.exports = router;
