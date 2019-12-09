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
  res.send("respond with a resource");
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

module.exports = router;
