const subproductService = require("../../services/subproductService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();

class Subproduct {
  constructor(req) {
    this.req = req;
  }

  async existSubproduct() {
    const queryExist = subproductService.existSubproduct();
    const product = await promisePool.query(queryExist, [this.producto]);
    return product;
  }

  async createSubproduct() {
    let connection;
    try {
      // Obtener la conexión antes de iniciar la transacción
      connection = await promisePool.getConnection();
      await connection.beginTransaction(); // Iniciar la transacción
  
      // Construir placeholders para la consulta
      const placeholders = this.req.subproductos.map(() => ' (?,?)').join(',');
      const query = `INSERT INTO subproduct (Id_producto, Subproducto) VALUES ${placeholders}`;
      // Extraer los valores en un array plano
      const values = this.req.subproductos.flatMap(subproduct => [this.req.id_producto,subproduct.subproducto]);
  
      // Ejecutar la consulta con los valores
      const [result] = await connection.execute(query, values);
  
      await connection.commit();
      return result;
    } catch (error) {
      if (connection) {
        await connection.rollback(); 
      }
      console.error('Error al insertar subproductos:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release(); 
      }
    }
  }

}

module.exports = Subproduct;
