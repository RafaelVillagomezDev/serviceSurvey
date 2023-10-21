const surveyService = require("../services/surveyServices");
const productService=require("../services/productService");
const subproductService=require("../services/subproductService");
const userSurveyService=require("../services/userSurveyService");
const db = require("../connection/bd");
const {matchedData,validationResult} = require('express-validator');
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");
const { v4:uuidv4 } = require('uuid');

const getSurvey = async (req, res,next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const query = surveyService.getSurvey();
    const result = await promisePool.query(query);
    res.send({
       status:200,
       data:result[0]
    });
  } catch (error) {
    
    handleHttpError(res,"Error al obtener encuestas")
    return
  }
};



const createSurvey=async (req, res,next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const dataProvidedToken={
      email:req.email,
      rol:req.rol
   }
  
    req = matchedData(req);
    
   

    const uuid_survey=await uuidv4()
    const newReq={...req,id_encuesta:uuid_survey}
    const { id_encuesta,dni, producto, mantenimiento, tipo_mantenimiento,estado,id_subproducto} = newReq;


    const queryProduct=productService.existProduct()
    const [existProduct]= await promisePool.query(queryProduct, [producto]);
    
    if (existProduct.length == 0) {
      handleHttpError(res, "ERROR AL INSERTAR PRODUCTO REVISAR BD", 401);
      return;
    }

    const querySubproduct=subproductService.existSubproduct()

    const [existSubproduct]= await promisePool.query(querySubproduct, [id_subproducto,producto]);
    
    if (existSubproduct.length == 0) {
      handleHttpError(res, "ERROR AL INSERTAR SUBPRODUCTO REVISAR BD", 401);
      return;
    }


    const queryCreate = surveyService.createSurvey();
    const result = await promisePool.query(queryCreate,[id_encuesta,dni,producto,mantenimiento,tipo_mantenimiento,estado,id_subproducto]);
    

    const uuid_user_survey=await uuidv4()
    const queryUserServiceCreate=userSurveyService.createUserSurvey();
    const resultUserService=await promisePool.query(queryUserServiceCreate,[uuid_user_survey,dataProvidedToken.email,id_encuesta]);
  
    if (resultUserService.length == 0) {
      handleHttpError(res, "ERROR AL INSERTAR USER_SURVEY REVISAR BD", 401);
      return;
    }


    if(result[0].affectedRows>0){
      res.send({
        status:200,
        data:"encuesta creada satifactoriamente"
     });
    }
  
  } catch (error) {
    console.log(error)
    handleHttpError(res,"Error al crear encuestas")
    return
  }
};



const deleteSurvey=async (req, res,next) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);
    const {id_encuesta}=req 

    const queryDelUserSurvey=userSurveyService.deleteUserSurvey()

    const [deleteUserSurvey]= await promisePool.query(queryDelUserSurvey, [id_encuesta]);
    
    if ( deleteUserSurvey.affectedRows== 0) {
      handleHttpError(res, "ERROR AL BORRAR USER ENCUESTA", 401);
      return;
    }

    
    const queryDeleteSurvey=surveyService.deleteSurvey()

    const [deleteSurvey]= await promisePool.query(queryDeleteSurvey, [id_encuesta]);
    
    if ( deleteSurvey.affectedRows== 0) {
      handleHttpError(res, "ERROR AL BORRAR ENCUESTA", 401);
      return;
    }
    
    res.send({
       status:200,
       data:"Encuesta borrada satifactoriamente"
    });
    
  } catch (error) {
    
    handleHttpError(res,"Error al eliminar encuestas")
    return
  }
};

const updateSurvey=async (req, res,next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {6
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const query = surveyService.getSurveys();
    const result = await promisePool.query(query);
    res.send({
       status:200,
       data:result[0]
    });
  } catch (error) {
    
    handleHttpError(res,"Error al obtener encuestas")
    return
  }
};

module.exports = {
  getSurvey,
  createSurvey,
  deleteSurvey,
  updateSurvey,
};
