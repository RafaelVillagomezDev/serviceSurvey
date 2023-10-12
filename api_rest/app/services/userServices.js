const User = require("../database/User");

const userService=require("../services/userServices");




const getAllUsers = () => {

  const query='SELECT * from product;'
   return query;
 
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
