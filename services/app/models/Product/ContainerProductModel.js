const productService = require("../../services/productService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const containerService = require("../../services/containerProductService");

class ContainerProduct {
  constructor(id_container) {
    this.id_container = id_container;
  }

  async createContainer() {
    const queryExist = containerService.createContainer();
    const survey = await promisePool.query(queryExist, [this.id_container]);
    return survey;
  }
}

module.exports = ContainerProduct;
