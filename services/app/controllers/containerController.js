const ContainerProduct = require("../models/Container/ContainerProductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const createContainer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
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
