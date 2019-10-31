var express = require("express");
var router = express.Router();

// req: the username and password of a user
// res: user object for matching user, session token, and cookie
// next: if error, error handler route
router.post("/login", function(req, res, next) {
  connection.connect();
  connection.query('SELECT uName, password FROM users WHERE uName=req.body.userName AND password=req.body.password', function (error, results) {
    if (error) throw error;
    if(results.length == 0) res.body.error = 'Invalid username and password.';
    else {
      connection.query('SELECT uID FROM users WHERE uName = req.body.userName', function (error, resul) {
        if (error) throw error;
        res.uId = resul;
      });
    }
  });
  console.log(req);
});

// req: the username and password of a new user
// res: user object for newly added user, session token, and cookie
// next: if error, error handler route
router.post("/register", function(req, res, next) {
  
  connection.connect();
  connection.query('SELECT uName FROM users WHERE uName=req.body.userName', function (error, results) {
    if (error) throw error;
    if (results.length > 0) res.body.error = 'User already exists.';
    else {
      connection.query('INSERT INTO users(uName, password) VALUES (req.body.userName, req.body.password)', function (error, results) {
        if (error) throw error;
        res.uId = results;
      });
    }
  });
  connection.end();
  
  console.log(req);
});

// req: the userid of a user
// res: clear session token and cookie
// next: if error, error handler route
router.post("/logout", function(req, res, next) {
  //return to login/register page
  console.log(req);
});

module.exports = router;
