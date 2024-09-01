const userSurveyService = require("../services/userSurveyService");
const Survey = require("../models/Survey/SurveyModel");
const Product = require("../models/Product/ProductModel");
const Subproduct = require("../models/Product/SubproductModel");

const { matchedData, validationResult } = require("express-validator");

const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const getSurveys = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const survey = new Survey();

    const existSurvey = await survey.getSurveys();

    res.send({
      status: 200,
      data: existSurvey[0],
    });

  } catch (error) {
    handleHttpError(res, "Error al obtener encuestas",400);
    return;
  }
};

const createSurvey = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const surveySchema = {
      id_encuesta:await uuidv4(),
      id_producto: await uuidv4(),
    };

    req = { ...req, ...surveySchema };

    const product = new Product(req.id_producto, req.producto);

    const createProduct = await product.createProduct();

    if (createProduct.length == 0) {
      handleHttpError(res, "Error al insertar producto", 400);
      return;
    }

    const subproduct=new Subproduct(req.id_producto,req.subproducto)

    const createSubproduct=await subproduct.createSubproduct()

    if (createSubproduct.length == 0) {
      handleHttpError(res, "Error al insertar subproducto", 400);
      return;
    }

    const survey = new Survey(req.id_encuesta,req.id_producto,req.descripcion)

    const createSurvey= await survey.createSurvey()

    if (createSurvey.length == 0) {
      handleHttpError(res, "Error al insertar encuesta", 400);
      return;
    }

    res.send({
      status:200,
      data:{
        msg:"Encuesta creada satisfactoriamente"
      }
    })

   
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al crear encuesta",400);
    return;
  }
};

const deleteSurvey = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);
    const { id_encuesta } = req;

    const queryDelUserSurvey = userSurveyService.deleteUserSurvey();

    const [deleteUserSurvey] = await promisePool.query(queryDelUserSurvey, [
      id_encuesta,
    ]);

    if (deleteUserSurvey.affectedRows == 0) {
      handleHttpError(res, "ERROR AL BORRAR USER ENCUESTA", 401);
      return;
    }

    const queryDeleteSurvey = surveyService.deleteSurvey();

    const [deleteSurvey] = await promisePool.query(queryDeleteSurvey, [
      id_encuesta,
    ]);

    if (deleteSurvey.affectedRows == 0) {
      handleHttpError(res, "ERROR AL BORRAR ENCUESTA", 401);
      return;
    }

    res.send({
      status: 200,
      id: id_encuesta,
      data: { msg: "Encuesta borrada satifactoriamente", id: id_encuesta },
    });
  } catch (error) {
    handleHttpError(res, "Error al eliminar encuestas");
    return;
  }
};

const updateSurvey = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      6;
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const query = surveyService.getSurveys();
    const result = await promisePool.query(query);
    res.send({
      status: 200,
      data: result[0],
    });
  } catch (error) {
    handleHttpError(res, "Error al obtener encuestas");
    return;
  }
};

module.exports = {
  getSurveys,
  createSurvey,
  deleteSurvey,
  updateSurvey,
};
