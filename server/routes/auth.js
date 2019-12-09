const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  database: "toyzrus"
});

const saltRounds = 10;

var router = express.Router();

// req: the username and password of a user
// res: user object for matching user, session token, and cookie
// next: if error, error handler route
router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const queryString = `SELECT * FROM users WHERE uName="${userName}"`;
  pool.getConnection((err, connection) => {
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) res.status(500).json(error);
      if (results.length != 1)
        res
          .status(500)
          .json({ error: "No user with that username/password combination" });
      else {
        var user = results[0];
        bcrypt.compare(userName + password, user.password, (err, result) => {
          if (result === true) {
            res.json({
              userId: user.uId,
              userType: user.type
            });
          } else {
            res.json({
              error: "Bad username password combo"
            });
          }
        });
      }
    });
  });
});

// req: the username and password of a new user
// res: user object for newly added user, session token, and cookie
// next: if error, error handler route
router.post("/register", function(req, res, next) {
  var hashedPassword = "";
  pool.getConnection((err, connection) => {
    connection.query(
      `SELECT uName FROM users WHERE uName="${req.body.userName}"`,
      function(error, results) {
        connection.release();
        if (error) res.status(500).json(error);
        if (results.length > 0)
          res.json({
            error: "User already exists."
          });
        else {
          bcrypt.hash(
            req.body.userName + req.body.password,
            saltRounds,
            (err, hash) => {
              pool.getConnection((err, connection) => {
                connection.query(
                  `INSERT INTO users(uName, password, type) VALUES ("${req.body.userName}", "${hash}", "customer")`,
                  function(error, results) {
                    connection.release();
                    if (error) res.status(500).json(error);
                    type = "customer";
                    res.json({
                      userId: results.insertId,
                      userType: type
                    });
                  }
                );
              });
            }
          );
        }
      }
    );
  });
});

// req: the userid of a user
// res: clear session token and cookie
// next: if error, error handler route
router.post("/logout", function(req, res, next) {
  //return to login/register page
  console.log(req);
});

module.exports = router;
