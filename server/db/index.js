var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// based off the npm module for msql since it's required above

//connection between database server and app server
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

connection.connect();
console.log('connection to the database!!!!!');
module.exports = connection; 

