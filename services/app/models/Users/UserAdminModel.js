const authService = require("../../services/authServices");
const db = require("../../connection/bd");
const User = require("./UserModel");
const promisePool = db.pool.promise();
const { v4: uuidv4 } = require("uuid");

class UserAdmin extends User {
  constructor(req) {
    super(req);
  }

  async createUser() {
    const queryRegister = authService.createUserAdmin();
    const admin = await promisePool.query(queryRegister, [
      this.req.id_admin,
      this.req.id_user,
      this.req.nif,
      this. req.tipo_compania,
    ]);

    return admin;
  }
}

module.exports = UserAdmin;
