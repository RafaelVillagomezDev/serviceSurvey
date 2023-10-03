const User = require("../database/User");





const getAllUsers = () => {

  const query='SELECT * AS solution from product'
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
