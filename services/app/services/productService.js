const existProduct = (productList) => {
  const placeholders = productList.map(() => "?").join(", ");
  const query = `
    SELECT Producto
    FROM product
    WHERE Id_producto = ?
      AND Producto IN (${placeholders})
    GROUP BY Producto;
  `;
  return query;
};

const createProduct = (placeholders) => {
  const query = `INSERT INTO product (Id_producto,Producto,Categoria,Id_container) VALUES ${placeholders};`;
  return query;
};

module.exports = {
  existProduct,
  createProduct,
};
