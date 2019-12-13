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

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

//req.body should contain itemId and saleAmount
router.post("/setSale", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
    const setSaleString = `UPDATE items SET saleAmount=${
      req.body.saleAmount === 0 ? 0 : req.body.saleAmount / 100
    } WHERE itemId=${req.body.itemId};`;
    connection.query(setSaleString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      } else {
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
      res.status(500).json(err);
    }
    const removeSaleString = `UPDATE items SET saleAmount=0.00 WHERE itemId=${req.body.itemId};`;
    connection.query(removeSaleString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      } else {
        console.log("Sale removed.");
        res.end();
      }
    });
  });
});

//Assumes req.body contains orderNumber
router.get("/sales", (req, res) => {
  const allOrdersString = `SELECT DISTINCT orderNumber, datePlaced, status FROM orders WHERE status<>"open";`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
    connection.query(allOrdersString, function(error, results) {
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      } else {
        var salesStats = [];
        results.forEach(order => {
          var totalSaleAmount = 0;
          order.datePlaced = ISODateString(order.datePlaced);
          const allItemsString = `SELECT * FROM orders NATURAL JOIN items WHERE orderNumber="${order.orderNumber}";`;
          connection.query(allItemsString, function(error, results) {
            if (error) {
              console.log(error.message);
              res.status(500).json(error);
            } else {
              results.forEach(item => {
                totalSaleAmount += item.cost - item.saleAmount;
              });
            }
          });
          salesStats.push({
            orderNumber: order.orderNumber,
            totalSale: totalSaleAmount,
            date: order.datePlaced,
            status: order.status
          });
          totalSaleAmount = 0;
        });
        connection.release();
        res.json(salesStats);
      }
    });
  });
});

module.exports = router;
