const User = require("../database/User");
const Flatted = require("flatted");
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const mysql= require('mysql');
 
    var connection =  mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE
    });
   
    connection.connect(); 

const getAllUsers =() => {



  const row = connection.query(
    "INSERT INTO PRODUCT (producto) VALUES ('LUZ');",
    function (error, results, fields) {
      if (error) throw error;

      console.log('The solution is: ', results[0]); 
      
    }
    
  );
  connection.end()
  

  return row;
};
const getOneUser = () => {
  const data = 12;

  return data;
};
const createNewUser = () => {
  return;
};
const updateOneUser = () => {
  return;
};
const deleteOneUser = () => {
  return;
};

module.exports = {
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers,
};
