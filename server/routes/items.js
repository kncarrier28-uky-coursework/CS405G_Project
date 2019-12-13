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
  const queryString = `SELECT * FROM items ${
    req.query.searchTerm
      ? `WHERE keyword="${req.query.searchTerm}" OR category="${req.query.searchTerm}"`
      : ""
  };`; //all rows in items database
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
      res.status(500).json(err);
    }
    const queryString = `SELECT * FROM items WHERE itemId="${req.params.itemId}";`;
    connection.query(queryString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      } else {
        //send data to client using json string
        res.json(results[0]);
      }
    });
  });
});

// req: itemName, cost, stock
router.post("/addItem", (req, res) => {
  const itemName = req.body.itemName;
  const category = req.body.category;
  const keyword = req.body.keyword;
  const cost = req.body.cost;
  const stock = req.body.stock;
  const queryString = `INSERT INTO items (itemName, category, keyword, stock, cost, saleAmount) values ("${itemName}", "${category}", "${keyword}", ${stock}, ${cost}, 0);`;
  console.log(queryString);
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
