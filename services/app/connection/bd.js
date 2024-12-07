var mysql = require("mysql2");

var connection = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSSWORD,
  database: process.env.DBDATABASE,
  port: process.env.DBPORT,
  // Mejor configuración para el pool
  connectionLimit: 10, 
  connectTimeout: 10000, 
  waitForConnections: true, 
  queueLimit: 0,
  debug: false, 
  timezone: "Z",
  multipleStatements: true,
  charset: "utf8mb4_general_ci",
  maxIdle: 1
};

const pool = mysql.createPool(connection);

module.exports = {
  pool,
};
