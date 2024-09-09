const productService = require("../../services/productService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const { v4: uuidv4 } = require("uuid");
class Product {
  constructor(req) {
    this.req=req
  }

  async existProduct() {
    try {
      const productList = this.req.productos.map(
        (product) => product.producto
      );

      const queryExist = productService.existProduct(productList);

      const [result] = await promisePool.query(queryExist, [
        this.req.id_producto,
        ...productList,
      ]);

      
      return  result

      
    } catch (error) {
      throw new Error(
        `Error al verificar la existencia de productos: ${error.message}`
      );
    }
  }

  async createProduct() {
    let connection;
    try {
      // Obtener la conexión antes de iniciar la transacción
      connection = await promisePool.getConnection();
      await connection.beginTransaction(); // Iniciar la transacción

      // Construir placeholders para la consulta
      const placeholders = this.req.productos.map(() => "(?,?,?,?)").join(",");
      const query = productService.createProduct(placeholders)


   
    

       // Generar un array de promesas que incluyen los UUIDs
    const valuesPromises = this.req.productos.map(async (product) => [
      await uuidv4(), // Generar UUID de forma asíncrona
      product.producto,
      product.categoria,
      this.req.id_container
    ]);

    // Resolver todas las promesas para obtener el array de valores planos
    const valuesArray = await Promise.all(valuesPromises);

    // Aplanar el array resultante
    const values = valuesArray.flat();

      // Ejecutar la consulta con los valores
      const [result] = await connection.execute(query, values);

      await connection.commit();
      return result;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }

      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

module.exports = Product;
