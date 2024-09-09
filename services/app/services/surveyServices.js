const getSurveys = () => {
  const query = "SELECT * from `encuesta`";
  return query;
};

const existSurvey=()=>{
  const query = "SELECT * from `encuesta` where Id_encuesta = ?;";
  return query;
}

const createSurvey = () => {
  const query ="INSERT INTO encuesta(Id_encuesta,Descripcion,Id_container,Id_usuario) VALUES (?,?,?,?);";
  return query;
};

module.exports = {
  getSurveys,
  existSurvey,
  createSurvey
};
