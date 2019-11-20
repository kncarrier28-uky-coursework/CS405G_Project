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

  var router = express.router();

  router.post("/add/", (req, res) => {
      const itemId = req.body.itemId;
      const quantity = req.body.quantity;
      const userId = req.body.userId;
      const findOpenCart = `SELECT orderNumber FROM orders WHERE uId="${userId}" AND status="open";`; 

      pool.getConnection((err, connection) => {
          connection.query(findOpenCart, function(error, results) {
            connection.release;
            if (error) throw error;
            var orderId;
            var item_existing = 0;
            if (results.length != 1) { //no open cart exists
                var new_orderNum = randomstring.generate(15);
                const createCart = `INSERT INTO orders(uId, status, orderNumber) VALUES("${userId}", "open", "${new_orderNum}");`;
                pool.getConnection((err, connection) => {
                    connection.query(createCart, function(error, results) {
                        connection.release;
                        if (error) throw error;
                        orderNumber = results.insertId;
                    });
                });
            } //create open cart if none exists
            else {
                orderId = results[0].orderId;
                const getExisting = `SELECT quantity FROM orders WHERE uId="${userId}" AND orderId="${orderId}" AND itemId="${itemId}";`;
                pool.getConnection((err, connect) => {
                    connection.query(getExisting, function(error, results) {
                        connection.release;
                        if (error) throw error;
                        item_existing = results[0].quantity;
                    });
                });
            } //get orderNumber if open cart exists
            var add_item;
            if (item_existing === 0) 
                add_item = `INSERT INTO orders(itemId, quantity) VALUES(") WHERE orderNumber="${orderNumber}";`
            else {
                all_items = item_existing + quantity;
                add_item = `UPDATE orders SET quantity="${all_items}" WHERE orderNumber="${orderNumber}" AND itemId="${itemId}";`
            }
          })
      })
  });

