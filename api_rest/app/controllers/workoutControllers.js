var express = require('express');
var router = express.Router();
const workoutService=require("../services/workoutServices");
const { handleHttpError } = require('../utils/handleError');

// In src/controllers/workoutController.js
const getAllWorkouts = (req, res) => {
   try{
    const allWorkouts=workoutService.getAllWorkoutouts()
    console.log(req.name)
    res.send({status:"ok",data:allWorkouts});
   }catch(res){
      handleHttpError(res,"Error en get AllWorkouts",400)
   }
   
};

const getOneWorkout = (req, res) => {
    const {body}=req
    const OneWorkout=workoutService.getOneWorkout(body)
    res.send({status:"ok",data:OneWorkout});
};

const createNewWorkout = (req, res) => {
    const NewWorkout=workoutService.createNewWorkout(req.params.workoutId)
    res.send({status:"ok",data:NewWorkout});
};

const updateOneWorkout = (req, res) => {
    const updateWorkout=workoutService.updateOneWorkout(req.params.workoutId)
    res.send({status:"ok",data:updateWorkout});
};

const deleteOneWorkout = (req, res) => {
    const deleteWorkout=workoutService.deleteOneWorkout(req.params.workoutId)
    res.send({status:"ok",data:deleteWorkout});
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};