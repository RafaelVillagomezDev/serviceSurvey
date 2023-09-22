const DB=require("../database/db.json")


const getAllWorkouts=()=>{
   
    return DB.workouts

}

const getData=()=>{
    let mesa={"mesa":"pequeña"}
    console.log(DB.workouts)
    return(DB.workouts[0].push(mesa))
}

module.exports={
    getAllWorkouts,
    getData
}