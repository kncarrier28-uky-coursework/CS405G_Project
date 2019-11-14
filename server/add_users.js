//uID: INT; password: VARCHAR(60); uName: VARCHAR(40); type: VARCHAR(40)

var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "geoffrey",
    password: "Ya9pQcM3x7BsRqDX",
    multipleStatements: true
});
const user1_addString =
    "INSERT INTO users(uID, password, uName, type) VAUES ()"; //add values

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected.");
});

con.query(user1_addString, function(error, results) {
    if (error) throw error;
    else console.log("User 1 added.");
});

con.end();