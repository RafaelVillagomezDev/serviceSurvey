const userService = require("../services/userServices");

const db = require("../connection/bd");
// In src/controllers/workoutController.js
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");

const getAllUsers = async (req, res) => {
  try {
    const query = userService.getAllUsers();
    const result = await promisePool.query(query);
    res.send({ status: result[0] });
  } catch (error) {
    
    handleHttpError(res,"Error al obtener users")
  }
};

const getOneUser = (req, res) => {
  const { body } = req;
  const OneUser = userService.getOneUser(body);
  res.send({ status: "ok", data: OneUser });
};

const createNewUser = (req, res) => {
  const NewUser = userService.createNewUser(req.params.workoutId);
  res.send({ status: "ok", data: NewUser });
};

const updateOneUser = (req, res) => {
  const updateUser = userService.updateOneUser(req.params.workoutId);
  res.send({ status: "ok", data: updateUser });
};

const deleteOneUser = (req, res) => {
  const deleteUser = userService.deleteOneUser(req.params.workoutId);
  res.send({ status: "ok", data: deleteUser });
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
