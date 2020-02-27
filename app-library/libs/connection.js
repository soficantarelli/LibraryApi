const mysql = require('mysql');

var connection = mysql.createConnection({
    host    : "db",
    user    : "root",
    password: "Sofia-123",
    database: "dbLibrary"
    });

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;