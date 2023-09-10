var express = require('express');
var router = express.Router();
const workoutService=require("../services/workoutServices")

// In src/controllers/workoutController.js
const getAllWorkouts = (req, res) => {
   const allWorkouts=workoutService.getAllWorkoutouts()
   
  res.send({status:"ok",data:allWorkouts,animal:"perro"});
};

const getOneWorkout = (req, res) => {
    const OneWorkout=workoutService.getOneWorkout(req.params.workoutId)
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