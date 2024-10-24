/*
  Funcion: recibe res , mensaje y codigo
  return paras: codigo del estado y mensaje
*/

const handleErrorGroup = (res, errors, messague = "Algo sucedió", code = 403) => {
    // Crear un objeto vacío para almacenar los errores
    const errorObject = {};
  
    // Recorrer el array de errores y separarlos por nombre de campo
    errors.array().forEach((error) => {
      const { path, msg } = error;
      // Si el campo ya tiene un error registrado, lo concatenamos con el nuevo
      if (errorObject[path]) {
        errorObject[path] += `, ${msg}`;
      } else {
        // Si no existe, asignamos el mensaje
        errorObject[path] = msg;
      }
    });
  
    // Responder con el código y el objeto de errores
    res.status(code).json({ status: code, message: messague, error: errorObject });
  };
  
  
  module.exports = { handleErrorGroup };
  