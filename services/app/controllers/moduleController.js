const Module = require("../models/Module/ModuleModel");


const { matchedData, validationResult } = require("express-validator");

const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const createModule = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
  
      req = matchedData(req);
  
      const moduleSchema = {
        id_modulo:await uuidv4(),
      };
  
      req = { ...req, ...moduleSchema};
  
     
  
      const module = new Module(req)
  
      const createModule= await module.createModule()
  
      if (createModule.length == 0) {
        handleHttpError(res, "Error al insertar modulo", 400);
        return;
      }
  
      res.send({
        status:200,
        data:{
          msg:"Modulo creado satisfactoriamente"
        }
      })
  
     
    } catch (error) {
      console.log(error);
      handleHttpError(res, "Error al crear modulo",400);
      return;
    }
  };
const getModule = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
  
      req = matchedData(req);
  
         
  
      const module = new Module(req)
  
      const existModule= await module.getModule()
      
      
   
      res.send({
        status:200,
        data:existModule[0]
        
      })
  
     
    } catch (error) {
      console.log(error);
      handleHttpError(res, "Error al obtener modulo",400);
      return;
    }
  };
  
  module.exports = {
    createModule,getModule
  };