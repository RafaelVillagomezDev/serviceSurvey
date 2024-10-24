const questionService = require("../services/questionService");
const Question = require("../models/Question/QuestionModel");

const { matchedData, validationResult } = require("express-validator");
const { handleErrorGroup } = require("../utils/handleErrorGroup");

/**
 * @swagger
 * /api/v1/question/create:
 *   post:
 *     summary: Crear una nueva pregunta
 *     description: Crea una nueva pregunta basada en los datos proporcionados en la solicitud.
 *     tags:
 *       - Preguntas
 *     security:
 *       - bearerAuth: [] # Si quieres que este endpoint requiera un Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               pregunta:
 *                 type: string
 *                 description: Texto de la pregunta.
 *                 example: "¿Cuál es tu color favorito?"
 *     responses:
 *       200:
 *         description: Pregunta creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     msg:
 *                       type: string
 *                       example: "ok"
 *       401:
 *         description: No autorizado - Token no válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token no proporcionado o no válido"
 *       422:
 *         description: Errores de validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Campo requerido"
 *                       param:
 *                         type: string
 *                         example: "pregunta"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear pregunta"
 */


const createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      handleErrorGroup(res,errors,"Error al crear pregunta",422)
      return
    }

    req = matchedData(req);
    
    res.send({
        status:200,
        data:{
          msg:"ok"
        }
      })

  } catch (error) {
    handleHttpError(res, "Error al crear pregunta", 400);
    return;
  }
};

module.exports = {
  createQuestion,
};
