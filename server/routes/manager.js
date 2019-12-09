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

//req.body should contain itemId and saleAmount
router.post("/setSale", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        const setSaleString = `UPDATE items SET saleAmount=${req.body.saleAmount} WHERE itemId=${req.body.itemId};`;
        connection.query(setSaleString, function(error, results) {
            connection.release();
            if (error) {
                console.log(error.message);
                throw error;
            }
            else {
                console.log("Sale updated.");
                res.end();
            }
        });
    });
});

//req.body should contain itemId
router.post("/removeSale", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err.message);
            throw err;
        }
        const removeSaleString = `UPDATE items SET saleAmount=0.00 WHERE itemId=${req.body.itemId};`;
        connection.query(removeSaleString, function(error, results) {
            connection.release();
            if (error) {
                console.log(error.message);
                throw error;
            }
            else {
                console.log("Sale removed.");
                res.end();
            }
        });
    });
});

module.exports = router;