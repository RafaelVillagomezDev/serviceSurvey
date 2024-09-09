const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const containerService = require("../../services/containerProductService");

class ContainerProduct {
  constructor(id_container, id_usuario) {
    this.id_container = id_container;
    this.id_usuario = id_usuario;
  }

  async createContainer() {
    const queryExist = containerService.createContainer();
    const survey = await promisePool.query(queryExist, [this.id_container,this.id_usuario]);
    return survey;
  }
}

module.exports = ContainerProduct;
