const getSurveys = () => {
  const query = `SELECT 
  E.Id_encuesta AS Encuesta_ID,
  E.Descripcion AS Encuesta_Descripcion,
  E.Fecha_creacion AS Encuesta_Fecha,
  CP.Id_container AS Container_ID,
  P.Id_producto AS Producto_ID,
  P.Producto AS Producto_Nombre,
  P.Categoria AS Producto_Categoria,
  P.Fecha_creacion AS Producto_Fecha,
  SP.Id_subproducto AS Subproducto_ID,
  SP.Subproducto AS Subproducto_Nombre,
  SP.Fecha_creacion AS Subproducto_Fecha
FROM 
  ENCUESTA E
INNER JOIN 
  CONTAINER_PRODUCT CP ON E.Id_container = CP.Id_container
INNER JOIN 
  PRODUCT P ON P.Id_container = CP.Id_container -- Esta es la corrección
INNER JOIN 
  SUBPRODUCT SP ON P.Id_producto = SP.Id_producto
ORDER BY 
  E.Fecha_creacion ASC, 
  P.Fecha_creacion ASC, 
  SP.Fecha_creacion ASC;`;
  return query;
};

const existSurvey = () => {
  const query = "SELECT * from `encuesta` where Id_encuesta = ?;";
  return query;
};

const createSurvey = () => {
  const query =
    "INSERT INTO encuesta(Id_encuesta,Descripcion,Id_container,Id_usuario) VALUES (?,?,?,?);";
  return query;
};

module.exports = {
  getSurveys,
  existSurvey,
  createSurvey,
};
