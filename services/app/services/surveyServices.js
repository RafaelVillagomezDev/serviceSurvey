const getSurveys = () => {
  const query = "SELECT * from `encuesta`";
  return query;
};


const createSurvey = () => {
  const query ="INSERT INTO encuesta(Id_encuesta,Id_producto,Descripcion) VALUES (?,?,?);";
  return query;
};

module.exports = {
  getSurveys,
  createSurvey
};
