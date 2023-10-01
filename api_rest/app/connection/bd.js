const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'08102015',
  database:'db_encuestas',
  port:3306,
});

module.exports=connection