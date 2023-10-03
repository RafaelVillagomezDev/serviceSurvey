var express = require('express');
var router = express.Router();
const userService=require("../services/userServices");
const { handleHttpError } = require('../utils/handleError');
const Flatted = require('flatted');
const connection =require("../connection/bd")
// In src/controllers/workoutController.js
const getAllUsers = (req, res) => {
    const query= userService.getAllUsers()
    connection.connection.query(query, function (error, results, fields) {
       if(error){
        return res.send({status:"ERROR"});
       }else{
        
        return res.send({status:query});
       }
      });
      
   
 
   
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