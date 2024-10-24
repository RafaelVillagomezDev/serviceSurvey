const Product = require("../models/Product/ProductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");
const { handleErrorGroup } = require("../utils/handleErrorGroup");


/**
 * @swagger
 * /api/v1/product/create:
 *   post:
 *     summary: Crear uno o más productos
 *     description: Crea uno o más productos y los asocia a un contenedor especificado por `id_container`.
 *     tags:
 *       - Productos
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productos
 *               - id_container
 *             properties:
 *               productos:
 *                 type: array
 *                 description: Lista de productos a crear.
 *                 items:
 *                   type: object
 *                   required:
 *                     - producto
 *                     - categoria
 *                   properties:
 *                     producto:
 *                       type: string
 *                       description: Nombre del producto.
 *                       example: "coche"
 *                     categoria:
 *                       type: string
 *                       description: Categoría a la que pertenece el producto.
 *                       example: "Automoción"
 *               id_container:
 *                 type: string
 *                 description: ID del contenedor al que se asociarán los productos.
 *                 example: "5869c707-d6f2-4c90-b536-d8fac658b17e"
 *     responses:
 *       200:
 *         description: Productos creados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "Productos creados con éxito"
 *       400:
 *         description: Error en la creación de productos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Error de validación en los datos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      handleErrorGroup(res,errors,"Error al crear producto",422)
        return
    }

  
    
    req = matchedData(req);

   

    const product = new Product(req);

    const existProduct = await product.existProduct();

    if (existProduct.length > 0) {
      const existingNames = existProduct.map((sub) => sub.Producto);
      
      handleHttpError(res, `Los siguientes productos ya existen ${existingNames.join(", ")}`)

      return
    }
 
  
    const createProduct = await product.createProduct();

    if (createProduct.length == 0) {
      handleHttpError(res, "Error al insertar producto", 400);
      return;
    }

    res.send({
      status: 200,
      data: "Producto creado con exito",
    });
  } catch (error) {
    handleHttpError(res, "Error al crear producto", 400);
    return;
  }
};

module.exports = {
  createProduct,
};
