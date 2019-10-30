var express = require("express");
var router = express.Router();

// req: the username and password of a user
// res: user object for matching user, session token, and cookie
// next: if error, error handler route
router.post("/login", function(req, res, next) {
  console.log(req);
});

// req: the username and password of a new user
// res: user object for newly added user, session token, and cookie
// next: if error, error handler route
router.post("/register", function(req, res, next) {
  console.log(req);
});

// req: the userid of a user
// res: clear session token and cookie
// next: if error, error handler route
router.post("/logout", function(req, res, next) {
  console.log(req);
});

module.exports = router;
