var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  multipleStatements: true
});
const item1_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (1, \"Princess Doll\", 60, 2, 4)";
const item2_addString =
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (2, \"Rubber Duck\", 70, 1, 2)";
const item3_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (3, \"Teddy Bear\", 50, 3, 5)";
const item4_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (4, \"Doll House\", 20, 6, 9)";
const item5_addString =
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (5, \"Crayons\", 50, 1, 2)";
const item6_addString =
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (6, \"Toy Car\", 45, 2, 4)";
const item7_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (7, \"Tricycle\", 15, 30, 45)";
const item8_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (8, \"Rubber Ball\", 30, 1, 2)";
const item9_addString =
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (9, \"Blocks\", 20, 1, 2)";
const item10_addString = 
    "INSERT INTO items(itemId, itemName, stock, cost, saleAmount) VALUES (10, \"Plush Dog\", 30, 3, 5)";

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected.");
});

con.query(item1_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 1 added.");
});

con.query(item2_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 2 added.");
});

con.query(item3_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 3 added.");
});

con.query(item4_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 4 added.");
});

con.query(item5_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 5 added.");
});

con.query(item6_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 6 added.");
});

con.query(item7_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 7 added.");
});

con.query(item8_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 8 added.");
});

con.query(item9_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 9 added.");
});

con.query(item10_addString, function(error, results) {
    if (error) throw error;
    else console.log("Item 10 added.");
});

con.end();