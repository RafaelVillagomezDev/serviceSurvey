const UserModel = require("../models/Users/UserModel");
const UserAdminModel = require("../models/Users/UserAdminModel");
const { handleHttpError } = require("../utils/handleError");
const { compare } = require("bcrypt");

class UserFactory {
  /**
   * Crear un usuario con rol de usuario o administrador.
   * @param {Object} obj - Datos del usuario.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  static async createUser(obj, res) {
    try {
      // Si el rol es 'admin', gestionar la creación en la tabla 'admins'
      if (obj.rol === "admin") {
        const admin = new UserAdminModel(obj);
        const adminCreate = await admin.createUser(obj);
        if (adminCreate[0].affectedRows <= 0) {
          return handleHttpError(
            res,
            "Error al registrar al administrador.",
            500
          );
        }

        return adminCreate[0].affectedRows;
      } else {
        // Verificar si el usuario ya existe en la tabla 'users'
        const user = new UserModel(obj);
        const userCreate = await user.createUser(obj);

        if (userCreate[0].affectedRows <= 0) {
          return handleHttpError(res, "Error al crear el usuario.", 500);
        }

        return userCreate[0].affectedRows;
      }
    } catch (error) {
      console.error(error);
      return handleHttpError(res, "Error al crear el usuario.", 500);
    }
  }

  static async loginAuthUser(obj, res) {
    try {
      const user = new UserModel(obj);
      const existUser = await user.existUser();

      if (existUser[0].length == 0) {
        return handleHttpError(res, "Error en inicio de sesion", 401);
      }

      const hashPassword = existUser[0][0].Passwd;

      const verifyCredentials = await compare(obj.password, hashPassword);

      if (!verifyCredentials) {
        return handleHttpError(res, "La contraseña es incorrecta", 401);
      }

      return existUser[0][0];
    } catch (error) {
      console.error(error);
      return handleHttpError(res, "Error en login", 401);
    }
  }

  static async getAuthUser(obj, res) {
    try {
      const user = new UserModel(obj);

      const userExist = await user.getUserId();

      if (userExist.length == 0) {
        return handleHttpError(res, "Error al obtener usuario", 401);
      }

      return userExist[0]
    } catch (error) {
      console.error(error);
      handleHttpError(res, "Error al obtener usuario");
    }
  }
}

module.exports = UserFactory;
