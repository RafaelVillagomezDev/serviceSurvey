const moduleService = require("../../services/moduleServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();


class Module {
  constructor(req) {
    const { id_modulo,nombre } = req
    
    this.id_modulo=id_modulo;
    this.nombre=nombre;
  }

  async createModule(){
    const queryExist = moduleService.createModule();
    const module = await promisePool.query(queryExist, [
      this.id_modulo,this.nombre
    ]);
    return module;
  }

  async getModule(){
    const queryExist = moduleService.getModule();
    const module = await promisePool.query(queryExist, [
      this.id_modulo
    ]);
    return module;
  }

   
}

module.exports = Module;
