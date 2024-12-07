const { body } = require("express-validator");

function validateModule(method) {
  switch (method) {
    case "create": {
      return [body("nombre", "Nombre invalido").trim().escape().isString()];
    }
  }
}

module.exports = { validateModule };
