var express = require('express');
var router = express.Router();
const userService=require("../services/userServices");
const { handleHttpError } = require('../utils/handleError');
const Flatted = require('flatted');

// In src/controllers/workoutController.js
const getAllUsers = (req, res) => {
    const query= userService.getAllUsers()
    console.log(query)
   return res.status(200).json(query);
 
   
};

const getOneUser= (req, res) => {
    const {body}=req
    const OneUser=userService.getOneUser(body)
    res.send({status:"ok",data:OneUser});
};

const createNewUser = (req, res) => {
    const NewUser=userService.createNewUser(req.params.workoutId)
    res.send({status:"ok",data:NewUser});
};

const updateOneUser = (req, res) => {
    const updateUser=userService.updateOneUser(req.params.workoutId)
    res.send({status:"ok",data:updateUser});
};

const deleteOneUser = (req, res) => {
    const deleteUser=userService.deleteOneUser(req.params.workoutId)
    res.send({status:"ok",data:deleteUser});
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};