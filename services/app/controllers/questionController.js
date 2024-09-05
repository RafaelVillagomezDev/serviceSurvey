const questionService = require("../services/questionService");
const Question = require("../models/Question/QuestionModel");

const { matchedData, validationResult } = require("express-validator");

const createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);
    
    res.send({
        status:200,
        data:{
          msg:"ok"
        }
      })

  } catch (error) {
    handleHttpError(res, "Error al crear pregunta", 400);
    return;
  }
};

module.exports = {
  createQuestion,
};
