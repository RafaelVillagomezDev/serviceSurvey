const Operation = require("../models/Operation/OperationModule");
const Module=require("../models/Module/ModuleModel");
const { matchedData, validationResult } = require("express-validator");

const { handleHttpError } = require("../utils/handleError");
const { v4: uuidv4 } = require("uuid");


const createOperation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      handleErrorGroup(res,errors,"Error en  crear operacion",422)
      return
    }

    req = matchedData(req);

    const operationSchema = {
      id_modulo: await uuidv4(),
    };

    req = { ...req, ...operationSchema };

    const operation = new Operation(req);


    const module=new Module(req)

  

    const existModule = await module.getModule();

    const createOperation = await operation.createOperation();


    if(existModule){
      handleHttpError(res, "No existe ese modulo", 400);
      return;
    }

    if (createOperation.length == 0) {
      handleHttpError(res, "Error al insertar operacion", 400);
      return;
    }

    res.send({
      status: 200,
      data: {
        msg: "Operacion creada satisfactoriamente",
      },
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al crear operacion", 400);
    return;
  }
};

module.exports = {
  createOperation,
};
