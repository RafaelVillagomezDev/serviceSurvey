/*
  Funcion: recibe res , mensaje y codigo
  return paras: codigo del estado y mensaje
*/
const handleHttpError = (res, messague = "Algo sucedió", code = 403) => {
  return res.status(code).send({
    status: code,
    message: messague,  
    error: { msg: messague },  
  });
};


module.exports = { handleHttpError };
