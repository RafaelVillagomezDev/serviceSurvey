const { body } = require("express-validator");

function validateOperation(method) {
  switch (method) {
    case "create": {
      return [body("nombre", "Nombre invalido para operación").trim().escape().isString(),
      body("id_modulo", "Id modulo invalido para operación").escape().trim().isUUID()];
    }
  }
}

module.exports = { validateOperation };
