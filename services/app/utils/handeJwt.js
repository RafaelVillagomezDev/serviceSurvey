const jsonwebtoken = require("jsonwebtoken");
var secretToken = process.env.JWT_SECRET;
/*
  funcion: recibe el objeto del usuario y firmamos el token
  return: JsonWebToken
*/

const tokenSign =async (authUser) => {
  const sign = jsonwebtoken.sign(
    {
      id_user: authUser.id_user,
      name_user: authUser.name_user,
      id_rol: authUser.id_rol,
    },
    secretToken,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};
/*
    funcion: recibe el tokenSign(JsonWebToken) de session y secretKey y verifica la firma del token 
    return:token decodificado
*/

const verifyToken = async (tokenSign) => {
  try {
    return jsonwebtoken.verify(tokenSign, secretToken);
  } catch (e) {
    return null;
  }
};

module.exports = {
  tokenSign,
  verifyToken,
};
