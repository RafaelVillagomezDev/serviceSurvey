var express = require('express');
var router = express.Router();
const workoutController=require("../../controllers/workoutControllers")

// In src/controllers/workoutController.js

/* GET home page. */
router.get('/',  workoutController.getAllWorkouts);

router.get('/:workoutId', workoutController.getOneWorkout);

router.post('/:workoutId', workoutController.createNewWorkout);

router.patch('/:workoutId', workoutController.updateOneWorkout);

router.delete('/:workoutId', workoutController.deleteOneWorkout);



module.exports = router