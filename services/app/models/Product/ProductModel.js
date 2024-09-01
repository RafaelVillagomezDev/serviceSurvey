const productService = require("../../services/productService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();

class Product {
  constructor(id_producto, producto) {
    this.id_producto = id_producto;
    this.producto = producto;
  }

  async existProduct() {
    const queryExist = productService.existProduct();
    const product = await promisePool.query(queryExist, [this.producto]);
    return product;
  }

  async createProduct() {
    const queryCreate = productService.createProduct();
    const product = await promisePool.query(queryCreate, [this.id_producto,this.producto]);
    return product;
  }
}

module.exports = Product;
