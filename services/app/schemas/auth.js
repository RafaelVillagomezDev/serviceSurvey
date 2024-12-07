const { checkSchema } = require("express-validator");
const { validateCIF } = require("../utils/handleRegex");

// Esquema de validaciones
const validationSchema = {
  create: checkSchema({
    email: {
      in: ["body"],
      errorMessage: "Email inválido",
      isLength: {
        options: { max: 50 },
        errorMessage: "El email debe tener máximo 50 caracteres",
      },
      trim: true,
      escape: true,
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Formato de email inválido",
      },
    },
    password: {
      in: ["body"],
      errorMessage: "La contraseña no es fuerte",
      isStrongPassword: true,
      trim: true,
      escape: true,
    },
    name_user: {
      in: ["body"],
      errorMessage: "Nombre inválido",
      trim: true,
      escape: true,
      isLength: {
        options: { max: 20 },
        errorMessage: "El nombre debe tener máximo 20 caracteres",
      },
      matches: {
        options: /^[A-Za-z0-9]{4,}$/,
        errorMessage: "El nombre debe tener al menos 4 caracteres alfanuméricos",
      },
    },
    surname: {
      in: ["body"],
      errorMessage: "Apellido inválido",
      trim: true,
      escape: true,
      isLength: {
        options: { max: 20 },
        errorMessage: "El apellido debe tener máximo 20 caracteres",
      },
      matches: {
        options: /^[A-Za-z0-9]{4,}$/,
        errorMessage: "El apellido debe tener al menos 4 caracteres alfanuméricos",
      },
    },
    birthday: {
      in: ["body"],
      errorMessage: "Fecha de nacimiento inválida",
      trim: true,
      escape: true,
      isDate: true,
    },
    dni: {
      in: ["body"],
      errorMessage: "DNI o NIE inválido",
      custom: {
        options: (value) => {
          const regexDni = /^[0-9]{8}[A-Z]$/;
          const regexNie = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
          return regexDni.test(value) || regexNie.test(value);
        },
      },
      trim: true,
      escape: true,
    },
    rol: {
      in: ["body"],
      errorMessage: "Rol inválido",
      custom: {
        options: (value) => {
          if (value === "admin" || value === "user") return true;
          throw new Error("Rol no permitido");
        },
      },
      trim: true,
      escape: true,
    },
    nif: {
      in: ["body"],
      errorMessage: "NIF inválido",
      optional: { options: { nullable: true } }, 
      custom: {
        options: (value, { req }) => {
          if (req.body.rol === "admin") {
            return validateCIF(value);
          }
          return true; 
        },
      },
      trim: true,
      escape: true,
    },
    tipo_compania: {
      in: ["body"],
      errorMessage: "Tipo de compañía inválido",
      optional: { options: { nullable: true } }, 
      isLength: {
        options: { max: 20 },
        errorMessage: "El email debe tener máximo 30 caracteres",
      },
      custom: {
        options: (value, { req }) => {
          if (req.body.rol === "admin") {
            const regexCompania = /^[a-zA-Z0-9]{1,30}$/;
            return regexCompania.test(value);
          }
          return true; 
        },
      },
      trim: true,
      escape: true,
    },
  }),

  login: checkSchema({
    email: {
      in: ["body"],
      errorMessage: "Email inválido",
      isLength: {
        options: { max: 50 },
        errorMessage: "El email debe tener máximo 50 caracteres",
      },
      trim: true,
      escape: true,
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Formato de email inválido",
      },
    },
    password: {
      in: ["body"],
      errorMessage: "La contraseña no es fuerte",
      isStrongPassword: true,
      trim: true,
      escape: true,
    },
  }),

  getUser: checkSchema({
    id_user: {
      in: ["param"],
      errorMessage: "Id de usuario debe ser un UUID",
      isUUID: true,
      trim: true,
      escape: true,
    },
  }),
};

module.exports = validationSchema;
