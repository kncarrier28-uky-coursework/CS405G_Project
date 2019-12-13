var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  multipleStatements: true
});
const createDBString =
  "DROP DATABASE IF EXISTS toyzrus; CREATE DATABASE toyzrus; USE toyzrus";
const createUserTableString =
  "CREATE TABLE users (uId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,password VARCHAR(60),uName VARCHAR(40),type VARCHAR(40));";
const createItemsTableString =
  "CREATE TABLE items (itemId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,itemName VARCHAR(40),category VARCHAR(40),keyword VARCHAR(40),stock INT,cost DECIMAL(38, 2),saleAmount DECIMAL(38, 2));";
const createOrdersTableString =
  "CREATE TABLE orders (orderId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,uId INT,itemId INT,status VARCHAR(20),quantity INT, orderNumber VARCHAR(15), datePlaced DATE);";

con.connect(function(err) {
  if (err) res.status(500).json(err);
  console.log("Connected!");
});

con.query(createDBString, function(error, results) {
  if (error) res.status(500).json(error);
  else console.log("Database created!");
});

con.query(
  createItemsTableString + createUserTableString + createOrdersTableString,
  function(error, results) {
    if (error) res.status(500).json(error);
    else console.log("Tables created!");
  }
);

con.end();
