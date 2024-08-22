const db = require("../connection/bd");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handeJwt");
const User = require("../models/UserModel");
const UserAdmin = require("../models/UserAdminModel");

const registerAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const dataBody = { ...req, password: passwordHash };
    req = dataBody;

    const user = new User(req);

    const existUser = await user.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await user.createUser(req);

    if (newUsers[0].affectedRows > 0) {
      const dataToken = { ...dataBody };

      const token = await tokenSign(dataToken);

      res.status(201).send({
        status: 200,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al registrar usuario");
  }
};

const registerAuthUserAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const dataBody = { ...req, password: passwordHash };
    req = dataBody;

    const userAdmin = new UserAdmin(req);

    const existUser = await userAdmin.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await userAdmin.createUser(req);

    if (newUsers[0].affectedRows > 0) {
      const dataToken = { ...dataBody };

      const token = await tokenSign(dataToken);

      res.status(201).send({
        status: 200,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
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
    const { password } = dataBody;

    const user = new User(req);
    const existUser = await user.existUser();

    if (existUser.length == 0) {
      handleHttpError(res, "El usuario no existe", 401);
      return;
    }

    const hashPassword = existUser[0][0].passwd;

    const verifyCredentials = await compare(password, hashPassword);

    if (!verifyCredentials) {
      handleHttpError(res, "la contraseña es incorrecta", 401);
      return;
    }

    const dataToken = {
      email: existUser[0].email,
      name_user: existUser[0].name_user,
      rol: existUser[0].rol_user,
    };

    const token = await tokenSign(dataToken);

    res.send({
      status: 200,
      token: token,
    });
  } catch (error) {
    handleHttpError(res, "Error al logearse el usuario");
  }
};

module.exports = {
  registerAuthUser,
  loginAuthUser,
  registerAuthUserAdmin,
};
