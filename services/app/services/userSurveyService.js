const createUserSurvey = () => {
    const query = "INSERT INTO user_encuesta (Id_UsuEncuesta,Email,id_encuesta) VALUES (?,?,?);";
    return query;
};

const deleteUserSurvey=()=>{
    const query = 'DELETE FROM user_encuesta WHERE  id_encuesta = ?;';
    return query;
}


const getUserSurvey=()=>{

}

module.exports = {
    createUserSurvey,
    deleteUserSurvey,
    getUserSurvey
};
  