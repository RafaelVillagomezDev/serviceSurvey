const existSubproduct = () => {
  const query = "SELECT * from `subproduct` WHERE `Id_subproducto` = ?;";
  return query;
};

const createSubproduct = () => {
  const query ="INSERT INTO subproduct(Id_producto,Subproducto) VALUES (?,?);";
  return query;
};

module.exports = {
  existSubproduct,
  createSubproduct
};
