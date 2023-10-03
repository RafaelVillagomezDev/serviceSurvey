const User = require("../database/User");
const connection =require("../connection/bd");




const getAllUsers = async() => {
  connection.connection.connect();

  connection.connection.query('SELECT * AS solution from product', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  
  connection.connection.end(); 
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
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers,
};
