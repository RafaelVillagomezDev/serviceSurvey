const Workout=require("../database/Workout")

const getAllWorkoutouts=()=>{
    const allWorkout=Workout.getAllWorkouts()
    return allWorkout;
};
const getOneWorkout=()=>{
    const data=Workout.getData()
   
    return data;
}
const createNewWorkouts=()=>{return};
const updateOneWorkouts=()=>{return};
const deleteOneWorkouts=()=>{return};

module.exports={
    getOneWorkout,
    createNewWorkouts,
    updateOneWorkouts,
    deleteOneWorkouts,
    getAllWorkoutouts
}