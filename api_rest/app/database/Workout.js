const DB=require("../database/db.json")


const getAllWorkouts=()=>{
   
    return DB.workouts

}

module.exports={
    getAllWorkouts
}