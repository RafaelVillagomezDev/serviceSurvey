const User = require("../database/User");
const connection =require("../connection/bd")

const getAllUsers = () => {

   connection.promise().query("SELECT * FROM PRODUCT").then(([rows,fields])=>{
     return rows
    
   }).catch(console.log)
  .then( () => connection.end());
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
