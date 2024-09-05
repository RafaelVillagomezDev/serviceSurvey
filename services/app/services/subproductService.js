const existSubproduct = () => {
  const query = "SELECT * from `subproduct` WHERE `Id_subproducto` = ?;";
  return query;
};

const createSubproduct = (placeholders) => {
  const query =`INSERT INTO usuarios (nombre, email) VALUES ${placeholders}`;;
  return query;
};

module.exports = {
  existSubproduct,
  createSubproduct
};
