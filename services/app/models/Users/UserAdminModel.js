const authService = require("../../services/authServices");
const db = require("../../connection/bd");
const User = require("./UserModel");
const promisePool = db.pool.promise();

class UserAdmin extends User {
  constructor({
    rol,
    id_user,
    email,
    name_user,
    surname,
    password,
    birthday,
    dni,
    id_admin,
    nif,
    tipo_compania,
  }) {
    super({ rol, id_user, email, name_user, surname, password, birthday, dni });
    this.id_admin = id_admin;
    this.id_user = id_user;
    this.nif = nif;
    this.tipo_compania = tipo_compania;
  }

  async createUser() {
    try {
      const connection = await promisePool.getConnection();
      await connection.beginTransaction();

      const queryRegisterUser = authService.createUser();
       await connection.query(queryRegisterUser, [
        this.rol,
        this.id_user,
        this.email,
        this.name_user,
        this.surname,
        this.password,
        this.birthday,
        this.dni,
      ]);

      const queryRegister = authService.createUserAdmin();
      const admin = await connection.query(queryRegister, [
        this.id_admin,
        this.id_user,
        this.nif,
        this.tipo_compania,
      ]);

      await connection.commit();

      connection.release();

      return admin;
    } catch (error) {
      await connection.rollback();

      connection.release();

      throw error;
    }
  }

  async existUser() {
    const queryExist = authService.existAdmin();
    const existAdmin = await promisePool.query(queryExist, [this.id_user]);
    return existAdmin;
  }

  async getUserIdAdmin() {
    const queryExist = authService.searchUserIdAdmin();
    const user = await promisePool.query(queryExist, [this.id_user]);
    return user;
  }
}

module.exports = UserAdmin;
