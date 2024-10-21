const Rol = require("../models/Roles/RolesModel");


const { matchedData, validationResult } = require("express-validator");

const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");

const createRol = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
  
      req = matchedData(req);
  
      const surveySchema = {
        id_encuesta:await uuidv4(),
      };
  
      req = { ...req, ...surveySchema };
  
     
  
      const rol = new Rol(req)
  
      const createRol= await rol.createRol()
  
      if (createRol.length == 0) {
        handleHttpError(res, "Error al insertar rol", 400);
        return;
      }
  
      res.send({
        status:200,
        data:{
          msg:"Rol creado satisfactoriamente"
        }
      })
  
     
    } catch (error) {
      console.log(error);
      handleHttpError(res, "Error al crear rol",400);
      return;
    }
  };
  
  module.exports = {
    createRol
  };