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
      res.status(500).json(err);
    }
    connection.query(allItemsString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
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
      res.status(500).json(err);
    }
    connection.query(allItemsString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
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
      res.status(500).json(err);
    }
    const cancelString = `UPDATE orders SET status = "canceled" WHERE orderNumber="${req.body.orderNumber}";`;
    connection.query(cancelString, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
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
      res.status(500).json(err);
    }
    const currentDate = ISODateString(new Date());
    const pendingString = `UPDATE orders SET status = "pending", datePlaced = "${currentDate}" WHERE orderNumber="${req.body.orderNumber}";`;
    connection.query(pendingString, function(error, results) {
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      } else {
        console.log("Record changed.");
        res.end();
      }
    });
  });
});

//change status of orderId to "shipped"
router.post("/shipped", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
    console.log("in ship");
    const getQuantities = `SELECT itemId, quantity FROM orders WHERE orderNumber="${req.body.orderNumber}";`;
    connection.query(getQuantities, function(error, results) {
      if (error) {
        console.log(error.message);
        res.status(500).json(error);
      }
      var items_needed = [];
      for (i = 0; i < results.length; i++) {
        items_needed.push([results[i].itemId, results[i].quantity]);
      }
      var getInventoryStock = `SELECT itemId, stock FROM items WHERE`;
      for (i = 0; i < results.length; i++) {
        getInventoryStock += " itemId=" + items_needed[i][0] + "";
        if (i < results.length - 1) getInventoryStock += " or";
      }
      getInventoryStock += ";";
      connection.query(getInventoryStock, function(error, results) {
        if (error) {
          console.log(error.message);
          res.status(500).json(error);
        }
        var items_missing = [];
        var cur_index = 0;
        for (i = 0; i < results.length; i++) {
          if (results[i].stock < items_needed[i][1]) {
            items_missing.push([
              results[i].itemId,
              items_needed[i][1] - results[i].stock
            ]);
          }
        }
        if (items_missing.length !== 0) {
          res.status(500).json(items_missing);
        } else {
          res.end();
          var updateStock = ``;
          var cur_itemId = 0;
          var cur_quantity = 0;
          //Remove shipped items from inventory
          for (i = 0; i < items_needed.length; i++) {
            cur_itemId = items_needed[i][0];
            cur_quantity = results[i].stock - items_needed[i][1];
            var updateStock = `UPDATE items set stock=${cur_quantity} WHERE itemId=${cur_itemId};`;
            connection.query(updateStock, function(error, results) {
              if (error) {
                console.log(error.message);
                res.status(500).json(error);
              }
            });
          }
          //Update order status
          const shippedString = `UPDATE orders SET status = "shipped" WHERE orderNumber="${req.body.orderNumber}";`;
          connection.query(shippedString, function(error, reuslts) {
            if (error) {
              console.log(error.message);
              res.status(500).json(error);
            }
          });
        }
      });
      connection.release();
    });
  });
});

module.exports = router;
