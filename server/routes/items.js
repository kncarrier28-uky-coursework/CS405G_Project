//all operations with items database
//return all items
//return specifc item

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
      const queryString = 'SELECT * FROM items';   //all rows in items database
      pool.getConnection((err, connection) => {
        if (err) {console.log(err.message); throw err; }
        connection.query(queryString, function(error, results) {
          connection.release;
          if (error) { console.log (error.message); throw error; }
          else {
            console.log(results);
            //send data to client using json string
            res.json(results);
            //console.log(res.json);
          }
        });
      });

      //send in array (json)
  });

  router.get("/:itemId", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {console.log(err.message); throw err; }
      const queryString = `SELECT * FROM items WHERE itemId="${req.params.itemId}"`;
      connection.query(queryString, function(error, results) {
        connection.release;
        if (error) {console.log(error.message); throw error; }
        else {
          console.log(results);
          //send data to client using json string
          res.json(results);
        }
      });
    });

    console.log(req.params.itemId);
  });

  module.exports = router;