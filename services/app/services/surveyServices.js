const getSurvey = () => {
  const query = "SELECT * from encuesta;";
  return query;
};


const createSurvey = () => {
  const query = "INSERT INTO ENCUESTA (Id_encuesta,Dni,Producto,Mantenimiento,Tipo_mantenimiento,Estado,Id_subproducto) VALUES (?,UPPER(?),UPPER(?),UPPER(?),UPPER(?),UPPER(?),?);";
  return query;
};

const deleteSurvey=()=>{
  const query = 'DELETE FROM encuesta WHERE  id_encuesta = ?;';
  return query;
}

module.exports = {
  getSurvey,
  createSurvey,
  deleteSurvey
};
