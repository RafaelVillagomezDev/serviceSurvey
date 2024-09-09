const existSubproduct = (subproductosList) => {
  const placeholders = subproductosList.map(() => "?").join(", ");
  const query = `
    SELECT Subproducto
    FROM subproduct
    WHERE Id_producto = ?
      AND Subproducto IN (${placeholders})
    GROUP BY Subproducto;
  `;
  return query;
};

const createSubproduct = (placeholders) => {
  const query = `INSERT INTO subproduct (Id_producto, Subproducto) VALUES ${placeholders};`;
  return query;
};

module.exports = {
  existSubproduct,
  createSubproduct,
};
