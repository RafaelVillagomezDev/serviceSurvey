const Subproduct = require("../models/Product/SubproductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const createSubproduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

 
    
    req = matchedData(req);



    const subproduct = new Subproduct(req);

    const createSubproduct = await subproduct.createSubproduct()

    if (createSubproduct.length == 0) {
      handleHttpError(res, "Error al insertar subproducto", 400);
      return;
    }

    res.send({
      status: 200,
      data: "Subproducto creado con exito",
    });
  } catch (error) {
    handleHttpError(res, "Error al crear subproducto", 400);
    return;
  }
};

module.exports = {
  createSubproduct,
};
