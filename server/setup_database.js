var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "geoffrey",
  password: "Ya9pQcM3x7BsRqDX",
  multipleStatements: true
});
const createDBString =
  "DROP DATABASE IF EXISTS toyzrus; CREATE DATABASE toyzrus;";
const createUserTableString =
  "CREATE TABLE users (uId INT PRIMARY KEY NOT NULL,password VARCHAR(40),uName VARCHAR(40),type VARCHAR(40));";
const createItemsTableString =
  "CREATE TABLE items (itemId INT PRIMARY KEY NOT NULL,itemName VARCHAR(40),stock INT,cost INT,saleAmount INT);";
const createOrdersTableString =
  "CREATE TABLE orders (orderId INT PRIMARY KEY NOT NULL,uId INT,itemId INT,status VARCHAR(20),quantity INT);";

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(createDBString, function(error, results) {
    if (error) throw error;
    else console.log("Database created!");
  });
  con.query(
    createItemsTableString + createUserTableString + createOrdersTableString,
    function(error, results) {
      if (error) throw error;
      else console.log("Tables created!");
    }
  );
});

con.end();
