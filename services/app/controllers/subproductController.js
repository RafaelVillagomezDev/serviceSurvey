const Subproduct = require("../models/Product/SubproductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");


const createSubproduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const subproduct = new Subproduct(req);

    const existSubproduct = await subproduct.existSubproduct();

    if (existSubproduct.length > 0) {
      const existingNames = existSubproduct.map((sub) => sub.Subproducto);
      
      handleHttpError(res, `Los siguientes subproductos ya existen ${existingNames.join(", ")}`)

      return
    }

    const createSubproduct = await subproduct.createSubproduct();

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
