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

//serve all orders
router.get("/", (req, res) => {
    const allItemsString = 'SELECT * FROM orders;';
    pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err;}
        connection.query(allItemsString, function(error, results) {
            connection.release();
            if (error) {console.log(error.message); throw error;}
            else {
            console.log(results);
            res.json(results);
            }
        });
    });
});

//change status of orderId record to "cancelled"
router.post("/cancel", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err; }
        const cancelString = `UPDATE orders SET status = "cancelled" WHERE orderId=${req.body.orderId};`
        connection.query(cancelString, function(error, results) {
            connection.release();
            if (error) {console.log(error.message); throw error; }
            else {
                console.log("Record changed.");
                res.end();
            }
        });
    });
});

//change status of orderId record to "pending"
router.post("/pending", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err; }
        const pendingString = `UPDATE orders SET status = "pending" WHERE orderId=${req.body.orderId};`
        connection.query(pendingString, function(error, results) {
            connection.release();
            if (error) {console.log(error.message); throw error; }
            else {
                console.log("Record changed.");
                res.end();
            }
        });
    });
});

//change status of orderId to "shipped"
router.post("/shipped", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err; }
        const shippedString = `UPDATE orders SET status = "shipped" WHERE orderId=${req.body.orderId};`
        connection.query(shippedString, function(error, results) {
            connection.release();
            if (error) {console.log(error.message); throw error; }
            else {
                console.log("Record changed.");
                res.end();
            }
        });
    });
});

module.exports = router;
