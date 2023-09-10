const Workout=require("../database/Workout")

const getAllWorkoutouts=()=>{
    const allWorkout=Workout.getAllWorkouts()
    return allWorkout;
};
const createNewWorkouts=()=>{return};
const updateOneWorkouts=()=>{return};
const deleteOneWorkouts=()=>{return};

module.exports={
   
    createNewWorkouts,
    updateOneWorkouts,
    deleteOneWorkouts,
    getAllWorkoutouts
}