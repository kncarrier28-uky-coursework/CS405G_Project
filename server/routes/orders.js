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

router.get("/", (req, res) => {
    const allItemsString = 'SELECT * FROM orders;';
    pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err;}
        connection.query(allItemsString, function(error, results) {
            connection.release;
            if (error) {console.log(error.message); throw error;}
            console.log(results);
            //send data to client using json
        });
    });
});

module.exports = router;