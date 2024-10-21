const operationService = require("../../services/operationService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();


class Operation {
  constructor(req) {
    const { id_modulo,nombre } = req
    
    this.id_modulo=id_modulo;
    this.nombre=nombre;
  }

  async createOperation(){
    const queryExist = operationService.createOperation()
    const operation = await promisePool.query(queryExist, [
      this.id_modulo,this.nombre
    ]);
    return operation;
  }

  
   
}

module.exports = Operation;
