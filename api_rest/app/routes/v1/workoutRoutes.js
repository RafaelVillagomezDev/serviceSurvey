var express = require('express');
var router = express.Router();
const workoutController=require("../../controllers/workoutControllers")

const middlewareHeader=require("../../middlewares/customHeader")
// In src/controllers/workoutController.js

/* GET home page. */
router.get('/',middlewareHeader,workoutController.getAllWorkouts);

router.post('/data', workoutController.getOneWorkout);

router.post('/:workoutId', workoutController.createNewWorkout);

router.patch('/:workoutId', workoutController.updateOneWorkout);

router.delete('/:workoutId', workoutController.deleteOneWorkout);



module.exports = router