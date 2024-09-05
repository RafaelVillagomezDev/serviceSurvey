const existQuestion = () => {
  const query = "SELECT * from `pregunta` WHERE `Id_`pregunta` = ?;";
  return query;
};

module.exports = {
  existQuestion,
};
