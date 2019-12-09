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
  const queryString = "SELECT * FROM items;"; //all rows in items database
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
    }
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
      } else {
        //send data to client using json string
        res.json(results);
      }
    });
  });

  //send in array (json)
});

router.get("/:itemId", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    const queryString = `SELECT * FROM items WHERE itemId="${req.params.itemId}";`;
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        //send data to client using json string
        res.json(results[0]);
      }
    });
  });
});

// req: itemName, cost, stock
router.post("/addItem", (req, res) => {
  const item = req.params.itemName;
  const cost = req.params.cost;
  const stock = req.params.stock;
  const queryString =
    'INSERT INTO items (itemName, stock, cost) values ("${item}", "${stock}", "${cost}");';
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
    }
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) {
        res.status(500).json(error);
        console.log(error.message);
      } else {
        //send data to client using json string
        res.end();
      }
    });
  });
});

// req: itemId and new stock amount
router.post("/updateStock", (req, res) => {
  const itemId = req.body.itemId;
  const newStock = req.body.stock;
  const queryString = `UPDATE items SET stock="${newStock}" WHERE itemId="${itemId}";`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
    }
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) {
        res.status(500).json(error);
        console.log(error.message);
      } else {
        //send data to client using json string
        res.end();
      }
    });
  });
});

module.exports = router;
