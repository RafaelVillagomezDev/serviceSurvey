const Product = require("../models/Product/ProductModel");
const Subproduct = require("../models/Product/SubproductModel");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const surveySchema = {
      id_producto: await uuidv4(),
    };

    
    req = matchedData(req);

    req = { ...req, ...surveySchema };

    const product = new Product(req.id_producto,req.producto);

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
