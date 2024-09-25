const getSurveys = () => {
  const query = `SELECT 
  E.Id_encuesta AS Encuesta_ID,
  E.Descripcion AS Encuesta_Descripcion,
  E.Fecha_creacion AS Encuesta_Fecha,
  GROUP_CONCAT(DISTINCT P.Id_producto ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_ID,
  GROUP_CONCAT(DISTINCT P.Producto ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_Nombre,
  GROUP_CONCAT(DISTINCT P.Categoria ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_Categoria,
  GROUP_CONCAT(DISTINCT SP.Subproducto ORDER BY SP.Fecha_creacion ASC SEPARATOR ', ') AS Subproductos
FROM 
  ENCUESTA E
INNER JOIN 
  CONTAINER_PRODUCT CP ON E.Id_container = CP.Id_container
INNER JOIN 
  PRODUCT P ON P.Id_container = CP.Id_container 
LEFT JOIN 
  SUBPRODUCT SP ON P.Id_producto = SP.Id_producto
GROUP BY 
  E.Id_encuesta
ORDER BY 
  E.Fecha_creacion ASC;`;
  return query;
};

const getSurveyId=()=>{
  const query=`SELECT 
  E.Id_encuesta AS Encuesta_ID,
  E.Descripcion AS Encuesta_Descripcion,
  E.Fecha_creacion AS Encuesta_Fecha,
  GROUP_CONCAT(DISTINCT P.Id_producto ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_ID,
  GROUP_CONCAT(DISTINCT P.Producto ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_Nombre,
  GROUP_CONCAT(DISTINCT P.Categoria ORDER BY P.Fecha_creacion ASC SEPARATOR ', ') AS Productos_Categoria,
  GROUP_CONCAT(DISTINCT SP.Subproducto ORDER BY SP.Fecha_creacion ASC SEPARATOR ', ') AS Subproductos
FROM 
  ENCUESTA E
INNER JOIN 
  CONTAINER_PRODUCT CP ON E.Id_container = CP.Id_container
INNER JOIN 
  PRODUCT P ON P.Id_container = CP.Id_container 
LEFT JOIN 
  SUBPRODUCT SP ON P.Id_producto = SP.Id_producto
GROUP BY 
  E.Id_encuesta
HAVING 
E.Id_encuesta= ?
ORDER BY 
  E.Fecha_creacion ASC;
`
return query;
}

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
  getSurveyId
};
