var express = require('express');
var router = express.Router();


// In src/controllers/workoutController.js
const getAllWorkouts = (req, res) => {
  res.send(`soyy ${req.params.workoutId}`);
};

const getOneWorkout = (req, res) => {
    res.send(`soyy ${req.params.workoutId}`);
};

const createNewWorkout = (req, res) => {
    res.send(`soyy ${req.params.workoutId}`);
};

const updateOneWorkout = (req, res) => {
    res.send(`soyy ${req.params.workoutId}`);
};

const deleteOneWorkout = (req, res) => {
    res.send(`soyy ${req.params.workoutId}`);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};