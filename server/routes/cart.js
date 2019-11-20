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

  router.post("/add", (req, res) => {
      const itemId = req.body.itemId;
      const quantity = req.body.quantity;
      const userId = req.body.userId;
      const findOpenCart = `SELECT orderNumber FROM orders WHERE uId=${userId} AND status="open";`; 

      pool.getConnection((err, connection) => {
          connection.query(findOpenCart, function(error, results) {
            connection.release();
            if (error) throw error;
            var orderId;
            var item_existing = 0;
            if (results.length != 1) { //no open cart exists
                var new_orderNum = randomstring.generate(15);
                const createCart = `INSERT INTO orders(uId, status, orderNumber) VALUES(${userId}, "open", "${new_orderNum}");`;
                pool.getConnection((err, connection) => {
                    connection.query(createCart, function(error, results) {
                        connection.release();
                        if (error) throw error;
                        orderNumber = results.insertId;
                    });
                });
            } //create open cart if none exists
            else {
                orderId = results[0].orderId;
                const getExisting = `SELECT quantity FROM orders WHERE orderId=${orderId} AND itemId=${itemId} AND orderNumber="${orderNumber}";`;
                pool.getConnection((err, connection) => {
                    connection.query(getExisting, function(error, results) {
                        connection.release();
                        if (error) throw error;
                        item_existing = results[0].quantity;
                    });
                });
            } //get orderNumber if open cart exists
            item_existing += quantity;
            const add_item = `UPDATE orders SET quantity=${item_existing} WHERE itemId=${itemId} AND orderNumber="${orderNumber}";`
            pool.getConnection((err, connection) => {
                connection.query(add_item, function(error, results) {
                    connection.release();
                    if (error) throw error;
                });
            });
          });
      });
  });

  router.post("/remove", (req, res) => {
      pool.getConnection((err, connection) => {
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;
        const userId = req.body.userId;
        var item_existing;
        
        const findCartquanity = `SELECT quantity FROM orders WHERE itemId=${itemId} AND uId=${userId} AND status="open";`;
        connection.query(findCartquantity, function(error, results) {
            connection.release();
            item_existing = results[0].quantity;
        });
        item_existing -= quantity;
        if (item_existing <= 0) {
            updateItem = `DELETE FROM orders WHERE itemId=${itemId} AND uId=${userId} AND status="open";`
        }
    })
  })

