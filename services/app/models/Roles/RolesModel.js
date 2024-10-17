const rolService = require("../../services/rolServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const { v4: uuidv4 } = require("uuid");

class Rol {
  constructor(req) {
    const { id_rol,rol } = req
    
    this.id_rol=id_rol;
    this.rol=rol;
  }

  async getRol() {
    const queryExist = rolService.getRol();
    const rol = await promisePool.query(queryExist, [this.id_rol]);

    return rol;
  }

  async createRol(){
    const queryExist = rolService.createRol();
    const survey = await promisePool.query(queryExist, [
      this.rol,
    ]);
    return survey;
  }

   
}

module.exports = Rol;
