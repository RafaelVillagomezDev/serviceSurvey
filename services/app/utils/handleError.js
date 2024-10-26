/*
  Funcion: recibe res , mensaje y codigo
  return paras: codigo del estado y mensaje
*/
const handleHttpError = (res, messague = "Algo sucedio", code = 403) => {
  res.status(code);
  res.send({ 
    status:code,
    messague:{messague},
    error: {msg:messague} 
  });
};

module.exports = { handleHttpError };
