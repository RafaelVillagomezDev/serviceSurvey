const ContainerProduct = require("../models/Container/ContainerProductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");
const { handleErrorGroup } = require("../utils/handleErrorGroup");

/**
 * @swagger
 * /api/v1/container/create:
 *   post:
 *     summary: Crear un nuevo contenedor
 *     description: Crea un nuevo contenedor y lo asocia a un usuario específico.
 *     security:
 *     - bearerAuth: []
 *     tags:
 *       - Contenedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *             properties:
 *               id_usuario:
 *                 type: string
 *                 description: ID del usuario asociado al contenedor.
 *                 example: "a1b2c3d4-e5f6-7890-g1h2i3j4k5l6"
 *     responses:
 *       200:
 *         description: Contenedor creado exitosamente.
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
 *                   example: "Contenedor creado con éxito"
 *       400:
 *         description: Error en la creación del contenedor.
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
const createContainer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      handleErrorGroup(res,errors,"Error en auth",422)
      return
    }

    const surveySchema = {
      id_container: await uuidv4(),
    };

    req = matchedData(req);

    req = { ...req, ...surveySchema };

    const containerProduct = new ContainerProduct(
      req.id_container,
      req.id_usuario
    );

    const createContainer = await containerProduct.createContainer();

    if (createContainer.length == 0) {
      handleHttpError(res, "Error al insertar contenedor", 400);
      return;
    }

    res.send({
      status: 200,
      data: "Contenedor creado con exito",
    });
  } catch (error) {
    handleHttpError(res, "Error al crear contenedor", 400);
    return;
  }
};

module.exports = {
  createContainer,
};
