const express = require("express");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  database: "toyzrus"
});

var router = express.Router();

router.get("/:query", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
        
        var query = req.params.query.toLowerCase();
        const queryString = `SELECT * FROM items WHERE category="${query}" or keyword="${req.params.query}";`;
        connection.query(queryString, function(error, results) {
            connection.release();
            if (error) {
                console.log(error.message);
                res.status(500).json(error);
            } else {
                if (results.length === 0) {
                    res.json(0);
                }
                else res.json(results);
            }
        });
    });
});

module.exports = router;