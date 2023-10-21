var mysql= require('mysql2');

var connection = {
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.DBPASSSWORD,
  database : process.env.DBDATABASE
};

const pool = mysql.createPool(connection);

module.exports={
  pool
}