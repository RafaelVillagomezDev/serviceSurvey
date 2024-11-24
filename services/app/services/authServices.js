const createUser = () => {
  const query =
    "INSERT INTO USUARIO (Rol_value,Id_usuario,Email,Nombre_user,Apellido_user,Passwd,Fecha_nacimiento,Dni) VALUES (?,?,?,?,?,?,?,?);";
  return query;
};

const createUserAdmin = () => {
  const query =
    "INSERT INTO ADMIN (Id_admin,Id_usuario,Nif,Tipo_compania) VALUES (?,?,?,?);";
  return query;
};

const existUser = () => {
  const query = "SELECT * FROM `usuario` WHERE `email` = ?;";
  return query;
};

const searchUserId = () => {
  const query = `SELECT 
  usuario.Email AS email_usuario,
  usuario.Nombre_user AS nombre_usuario,
  usuario.Apellido_user AS apellido_usuario,
  usuario.Dni AS dni_usuario,
  usuario.Fecha_nacimiento AS fecha_nacimiento_usuario
FROM 
  usuario
WHERE 
  usuario.Id_usuario = ?;`;
  return query;
};

const searchUserIdAdmin = () => {
  const query = `SELECT 
  usuario.Email AS email_usuario,
  usuario.Nombre_user AS nombre_usuario,
  usuario.Apellido_user AS apellido_usuario,
  usuario.Dni AS dni_usuario,
  usuario.Fecha_nacimiento AS fecha_nacimiento_usuario,
  admin.Nif AS nif_administrador,
  admin.Tipo_compania AS tipo_compania_administrador
FROM 
  usuario
INNER JOIN 
  admin
  ON usuario.Id_usuario = admin.Id_usuario
WHERE 
  usuario.Id_usuario = ?;`;
  return query;
};

module.exports = {
  createUser,
  existUser,
  createUserAdmin,
  searchUserId,
  searchUserIdAdmin,
};
