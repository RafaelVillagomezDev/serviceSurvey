const db = require("../connection/bd");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handeJwt");
const User = require("../models/Users/UserModel");
const UserAdmin = require("../models/Users/UserAdminModel");
const { v4: uuidv4 } = require("uuid");

const registerAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const authObj = {
      id_user: await uuidv4(),
      password: passwordHash,
    };
    const dataBody = { ...req, ...authObj };
    req = dataBody;

    const user = new User(req);

    const existUser = await user.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await user.createUser(req);

    if (newUsers[0].affectedRows > 0) {

      const {password,dni,birthday,...dataToken}=req;

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
    const authObj = {
      password: passwordHash,
      id_user: await uuidv4(),
      id_admin: await uuidv4(),
    };
    const dataBody = { ...req,...authObj };
    req = dataBody;

    const user = new User(req);

    const existUser = await user.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await user.createUser(req);

    if (newUsers[0].affectedRows > 0) {
      const admin = new UserAdmin(req);
      const newAdmin = await admin.createUser(req);

      if (newAdmin[0].affectedRows > 0) {
        const {password,dni,id_admin,fecha_nacimiento,apellido,nif,...dataToken}=req;

        const token = await tokenSign(dataToken);

        res.status(201).send({
          status: 200,
          token: token,
        });
      }
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

    const hashPassword = existUser[0][0].Passwd;

    const verifyCredentials = await compare(password, hashPassword);

    if (!verifyCredentials) {
      handleHttpError(res, "la contraseña es incorrecta", 401);
      return;
    }

    const dataToken = {
      id_user: existUser[0][0].Id_usuario,
      name_user: existUser[0][0].Nombre_user,
      id_rol: existUser[0][0].Id_rol,
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
