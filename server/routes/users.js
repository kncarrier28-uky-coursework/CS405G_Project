var express = require("express");
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  database: "toyzrus"
});

var router = express.Router();

/* GET all users listing. */
router.get("/", function(req, res, next) {
  const allUsers = `SELECT uName, type, uId FROM users;`;
  pool.getConnection((err, connection) => {
    connection.query(allUsers, (error, results) => {
      connection.release();
      if (error) console.log(error.message);
      res.json(results);
    });
  });
});

router.get("/:userId", function(req, res, next) {
  const userInfo = `SELECT uName, type FROM users WHERE uId=${req.params.userId};`;
  pool.getConnection((err, connection) => {
    if (err) res.status(500).json(err);
    connection.query(userInfo, function(error, results) {
      connection.release();
      if (error) console.log(error);
      res.json(results[0]);
    });
  });
});

router.post("/setType", (req, res) => {
  const userId = req.body.userId;
  const type = req.body.type;
  const setType = `UPDATE users SET type="${type}" WHERE uId=${userId}`;
  pool.getConnection((err, connection) => {
    if (err) res.status(500).json(err);
    connection.query(setType, (error, results) => {
      connection.release();
      if (error) console.log(error);
      res.end();
    });
  });
});

module.exports = router;
