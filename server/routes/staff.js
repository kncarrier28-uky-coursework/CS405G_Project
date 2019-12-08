var express = require("express");
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  database: "toyzrus"
});

var router = express.Router();

router.post("/ship", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    const getQuantities = `SELECT itemId, quantity FROM orders WHERE orderNumber=${req.body.orderNumber};`;
    connection.query(getQuantities, function(error, results) {
      connection.release();
      if (error) {
        console.log(error.message);
        throw error;
      }
      var items_needed = [];  
      for (i = 0; i < results.length; i++) {
        items_needed[i][0] = results[i].itemId;
        items_needed[i][1] = results[i].quantity;
      }
      var getInventoryStock = `SELECT itemId, stock FROM items WHERE`;
      for (i = 0; i < results.length; i++) {
        getInventoryStock += (" " + items_needed[i][0]);
      }
      getInventoryStock += ';';
      connection.query(getInventoryStock, function(error, results) {
        connection.release();
        if (error) {
          console.log(error.message);
          throw error;
        }
        var items_missing = [];
        var cur_index = 0;
        for (i = 0; i < results.length; i++) {
          if (results[i].stock < items_needed[i][1]) {
            items_missing[cur_index][0] = results[i].itemId;
            items_missing[cur_index][1] = (items_needed[i][1] - results[i].stock);
            cur_index += 1;
          }
        }
        if (items_missing.length !== 0) {
          console.log("missing items");
        }
        else {
          console.log("order shipped");
          //remove items from inventory, change status to shipped
        }
        res.json(items_missing);
      })
    })
  })
})


module.exports = router;