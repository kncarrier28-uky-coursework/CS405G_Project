const express = require("express");
const mysql = require("mysql");
const randomstring = require("randomstring");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  database: "toyzrus"
});

var router = express.Router();

router.use("/:userId*", (req, res, next) => {
  const userId = req.params.userId;
  const findOpenCart = `SELECT DISTINCT orderNumber FROM orders WHERE uId=${userId} AND status="open";`;
  pool.getConnection((err, connection) => {
    connection.query(findOpenCart, function(error, results) {
      connection.release();
      if (error) console.log(error);
      var item_existing = 0;
      if (results.length != 1) {
        //no open cart exists
        var new_orderNum = randomstring.generate(15);
        const createCart = `INSERT INTO orders(uId, status, orderNumber) VALUES(${userId}, "open", "${new_orderNum}");`;
        pool.getConnection((err, connection) => {
          connection.query(createCart, function(error, results) {
            connection.release();
            if (error) res.status(500).json(error);
            req.orderNumber = new_orderNum;
            next();
          });
        });
      } //create open cart if none exists
      else {
        req.orderNumber = results[0].orderNumber;
        next();
      }
    });
  });
});

router.get("/:userId", (req, res) => {
  const getUserCart = `SELECT * FROM orders NATURAL JOIN items WHERE orderNumber="${req.orderNumber}"`;
  pool.getConnection((err, connection) => {
    connection.query(getUserCart, (error, results) => {
      connection.release();
      var items = [];
      results.forEach(item => {
        items.push({
          itemId: item.itemId,
          quantity: item.quantity,
          cost: item.cost,
          saleAmount: item.saleAmount,
          itemName: item.itemName
        });
      });
      res.json({
        items: items,
        orderNumber: req.orderNumber
      });
    });
  });
});

router.post("/:userId/add", (req, res) => {
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;
  const orderNumber = req.orderNumber;

  const getExisting = `SELECT * FROM orders WHERE orderNumber="${orderNumber}";`;
  pool.getConnection((err, connection) => {
    connection.query(getExisting, function(error, results) {
      if (error) res.status(500).json(error);
      if (results.length === 1 && results[0].itemId === null) {
        const insertFirstItem = `UPDATE orders SET itemId=${itemId}, quantity=${quantity} WHERE orderNumber="${orderNumber}"`;
        connection.query(insertFirstItem, error => {
          connection.release();
          error ? console.log(error) : res.send();
        });
      } else {
        itemInOrder = false;
        quantityInOrder = 0;
        results.forEach(item => {
          if (item.itemId === itemId) {
            itemInOrder = true;
            quantityInOrder = item.quantity;
          }
        });
        const addItemQuery = itemInOrder
          ? `UPDATE orders SET quantity=${quantity +
              quantityInOrder} WHERE orderNumber="${orderNumber}" AND itemId=${itemId}`
          : `INSERT INTO orders(uId, status, orderNumber, itemId, quantity) VALUES(${req.params.userId}, "open", "${orderNumber}", ${itemId}, ${quantity})`;
        connection.query(addItemQuery, error => {
          connection.release();
          error ? console.log(error) : res.send();
        });
      }
    });
  });
});

router.post("/:userId/remove", (req, res) => {
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;
  const orderNumber = req.orderNumber;

  pool.getConnection((err, connection) => {
    const findCartquantity = `SELECT quantity FROM orders WHERE itemId=${itemId} AND orderNumber="${orderNumber}";`;
    connection.query(findCartquantity, function(error, results) {
      const currentQuantity = results[0].quantity;
      if (currentQuantity <= quantity) {
        connection.query(
          `SELECT COUNT(*) FROM orders WHERE orderNumber="${orderNumber}"`,
          (error, results) => {
            const removeQuery =
              results[0]["COUNT(*)"] === 1
                ? `UPDATE orders SET quantity=null, itemId=null where orderNumber="${orderNumber}"`
                : `DELETE FROM orders WHERE orderNumber="${orderNumber}" AND itemId=${itemId}`;
            connection.query(removeQuery, error => {
              connection.release();
              res.send();
            });
          }
        );
      } else {
        const removeQuery = `UPDATE orders SET quantity=${currentQuantity -
          quantity} WHERE orderNumber="${orderNumber}" AND itemId=${itemId}`;
        connection.query(removeQuery, error => {
          connection.release();
          error ? console.log(error) : res.send("Removed");
        });
      }
    });
  });
});

module.exports = router;
