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

//serve all orders
router.get("/", (req, res) => {
  const userId = req.query.userId | null;
  const allItemsString = `SELECT DISTINCT orderNumber, status, datePlaced FROM orders WHERE ${
    userId ? `uID=${userId} AND` : ""
  } status<>"open";`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    connection.query(allItemsString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        results.forEach(order => {
          order.datePlaced = ISODateString(order.datePlaced);
        });
        res.json(results);
      }
    });
  });
});

//serve specific order
router.get("/:orderNumber", (req, res) => {
  const orderNumber = req.params.orderNumber;
  const allItemsString = `SELECT * FROM orders NATURAL JOIN items WHERE orderNumber="${orderNumber}";`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    connection.query(allItemsString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        const orderInfo = {
          number: orderNumber,
          status: results[0].status,
          datePlaced: ISODateString(results[0].datePlaced),
          items: []
        };
        results.forEach(item => {
          orderInfo.items.push({
            id: item.itemId,
            quantity: item.quantity,
            itemName: item.itemName,
            cost: item.cost,
            saleAmount: item.saleAmount
          });
        });
        res.json(orderInfo);
      }
    });
  });
});

//change status of orderId record to "cancelled"
router.post("/cancel", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    const cancelString = `UPDATE orders SET status = "canceled" WHERE orderNumber="${req.body.orderNumber}";`;
    connection.query(cancelString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        console.log("Record changed.");
        res.end();
      }
    });
  });
});

//change status of orderId record to "pending"
router.post("/pending", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    connection.query(
      `SELECT * FROM orders NATURAL JOIN items WHERE orderNumber="${req.body.orderNumber}"`,
      (error, results) => {
        let tooMany = false;
        results.forEach(item => {
          if (item.quantity > item.stock) {
            console.log(item.quantity + " > " + item.stock);
            res.status(500).json({
              error: `Not enough inventory of ${item.itemName} to complete order`
            });
            tooMany = true;
          }
        });
        if (!tooMany) {
          results.forEach(item => {
            connection.query(
              `UPDATE items SET stock=${item.stock -
                item.quantity} WHERE itemId=${item.itemId}`
            );
          });
          const currentDate = ISODateString(new Date());
          const pendingString = `UPDATE orders SET status = "pending", datePlaced = "${currentDate}" WHERE orderNumber="${req.body.orderNumber}";`;
          connection.query(pendingString, function(error, results) {
            if (error) {
              console.log(error.message);
              throw error;
            } else {
              console.log("Record changed.");
              res.end();
            }
          });
        }
        connection.release();
      }
    );
  });
});

//change status of orderId to "shipped"
router.post("/shipped", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    const shippedString = `UPDATE orders SET status = "shipped" WHERE orderNumber="${req.body.orderNumber}";`;
    connection.query(shippedString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      } else {
        console.log("Record changed.");
        res.end();
      }
    });
  });
});

module.exports = router;
