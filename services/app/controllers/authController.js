const db = require("../connection/bd");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handeJwt");
const UserFactory = require("../factory/UserFactory");
const { v4: uuidv4 } = require("uuid");
const { handleErrorGroup } = require("../utils/handleErrorGroup");

class UserController {
  async registerAuthUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleErrorGroup(
          res,
          errors,
          "Error en registro de usuario",
          422
        );
      }

      req = matchedData(req);

      const authObj = {
        id_user: await uuidv4(),
        id_admin: await uuidv4(),
        password: await encrypt(req.password),
      };
      const dataBody = { ...req, ...authObj };
      req = dataBody;

      const user = await UserFactory.createUser(req, res);

      if (user > 0) {
        const token = await tokenSign(req);
        return res.status(201).send({
          status: 200,
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      return handleHttpError(res, "Error al crear usuario", 401);
    }
  }

  async loginAuthUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleErrorGroup(res, errors, "Error en login", 422);
      }

      req = matchedData(req);

      const user = await UserFactory.loginAuthUser(req, res);

      if (user) {
        const dataToken = {
          id_user: user.Id_usuario,
          name_user: user.Nombre_user,
          rol: user.Rol_Value,
        };

        const token = await tokenSign(dataToken);

        res.send({
          status: 200,
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      return handleHttpError(res, "Error en login", error);
    }
  }

  async getUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleErrorGroup(res, errors, "Error al obtener usuario", 422);
      }

      req = matchedData(req, { locations: ["params"] });

      const user = await UserFactory.getAuthUser(req, res);

      if (user) {
        res.send({
          status: 200,
          data: user,
        });
      }
    } catch (error) {
      return handleHttpError(res, "Error al obtener usuario", 401);
    }
  }
}

module.exports = new UserController();
