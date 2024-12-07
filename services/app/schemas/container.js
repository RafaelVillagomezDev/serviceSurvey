const { body } = require("express-validator");

function validateContainer(method) {
  switch (method) {
    case "create": {
      return [body("id_usuario", "Usuario invalido").trim().escape().isUUID()];
    }
  }
}

module.exports = { validateContainer };
