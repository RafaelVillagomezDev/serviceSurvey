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
    if (!payloadToken.email) {
      handleHttpError(res, "Accesso invalido", 401);
      return
    }
    const rol= req.rol=payloadToken.rol
    const email=req.email=payloadToken.email
    const dataToken={
        rol:rol,
        email:email
    }

    req={...req,...dataToken}

  } catch (e) {
    handleHttpError(res, "Error auth token", 401);
    return
  }
  
  
  next();
};

/*
  Midleware: funcion que verifica las rutas dependiendo de permisos  
  
*/

const authCredentials = async (req, res, next) => {
  if(req.rol!="admin"){
    handleHttpError(res, "Error no tienes permisos de admin", 401);
    return
  }
  next();
};


module.exports = { authToken ,authCredentials};
