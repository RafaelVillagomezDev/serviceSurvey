const Product = require("../models/Product/ProductModel");
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
