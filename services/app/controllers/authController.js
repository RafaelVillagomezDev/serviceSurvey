const db = require("../connection/bd");
const { matchedData, validationResult } = require("express-validator");
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const authService = require("../services/authServices");
const { validateRol } = require("../utils/handleRegex");
const { tokenSign } = require("../utils/handeJwt");

const registerAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const queryExist = authService.existUser();
    const existUser = await promisePool.query(queryExist, [req.email]);
    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const passwordHash = await encrypt(req.password);
    const dataBody = { ...req, password: passwordHash };
    const { email, name_user, surname, password } = dataBody;
    const queryRegister = authService.createUser(dataBody);

    let data = null;
    let rol = "user";

    if (validateRol(email)) {
      rol = "admin";
      data = await promisePool.query(queryRegister, [email,rol,name_user,surname,password,]);
    } else {
      data = await promisePool.query(queryRegister, [email,rol,name_user,surname,password,]);
    }

    if (data[0].affectedRows > 0) {
      const dataToken = { ...dataBody, rol: rol };

      const token = await tokenSign(dataToken);

      res.status(201).send({
        status: 200,
        token: token,
      });
    }
  } catch (error) {
    console.log(error)
    handleHttpError(res, "Error al registrar usuario");
  }
};

const loginAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const dataBody = { ...req };
    const { email, password } = dataBody;

    const queryExist = authService.existUser();
    const [existUser, fields] = await promisePool.query(queryExist, [email]);

    if (existUser.length == 0) {
      handleHttpError(res, "El usuario no existe", 401);
      return;
    }

    const hashPassword = existUser[0].passwd;
    const verifyCredentials = await compare(password, hashPassword);

    if (!verifyCredentials) {
      handleHttpError(res, "la contraseña es incorrecta", 401);
      return;
    }

    const data = {
      name: existUser[0].name_user,
      surname: existUser[0].surname_user,
      rol: existUser[0].rol_user,
    };
    const dataToken = {
      email: existUser[0].email,
      name_user: existUser[0].name_user,
      rol: existUser[0].rol_user,
    };

    const token = await tokenSign(dataToken);

    res.send({
      status: 200,
      token: token,
      data: data,
    });
    
  } catch (error) {
    handleHttpError(res, "Error al logearse el usuario");
  }
};

module.exports = {
  registerAuthUser,
  loginAuthUser,
};
