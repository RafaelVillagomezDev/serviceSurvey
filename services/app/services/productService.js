const existProduct = () => {
  const query = "SELECT * from `product` WHERE `producto` = ?;";
  return query;
};

const createProduct = () => {
  const query ="INSERT INTO product(Id_producto,Producto) VALUES (?,?);";
  return query;
};

module.exports = {
  existProduct,
  createProduct,
};
