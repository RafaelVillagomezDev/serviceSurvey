const subproductService = require("../../services/subproductService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();

class Subproduct {
  constructor(id_producto,subproducto) {
    this.id_producto = id_producto;
    this.subproducto = subproducto;
  }

  async existSubproduct() {
    const queryExist = subproductService.existSubproduct();
    const product = await promisePool.query(queryExist, [this.producto]);
    return product;
  }

  async createSubproduct() {
    const queryExist = subproductService.createSubproduct();
    const subproduct = await promisePool.query(queryExist, [this.id_producto,this.subproducto]);
    return subproduct;
  }

}

module.exports = Subproduct;
