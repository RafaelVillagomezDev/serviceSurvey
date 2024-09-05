const { handleHttpError } = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handeJwt");

/*
  Midleware: funcion verifica la auenticidad del token 
  changes : rol de usuario autenticado 
*/
const authToken = async (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (!bearer) {
    handleHttpError(res, "Debes proporcionar un token en el Bearer");
    return
  }

  try {
    const token = req.headers.authorization.split(" ").pop();
    const payloadToken = await verifyToken(token);
    if (!payloadToken.id_user) {
      handleHttpError(res, "Accesso invalido", 401);
      return
    }

  } catch (e) {
    handleHttpError(res, "Error auth token", 401);
    return
  }
  
  
  next();
};



module.exports = { authToken};
