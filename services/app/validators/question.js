const {body,param}= require('express-validator');
const { testRegex } = require('../utils/handleRegex');
const Survey = require('../models/Survey/SurveyModel');

function validateQuestion(method){
   switch (method) {
       case 'create': {
        return [ 
              body("question","Pregunta invalida").escape().trim().custom(value=>{
                    const regexText=/^[a-zA-Z0-9\s.,¿?!¡()[\]{}*#]+$/;
                    const question=testRegex(regexText,value)
                    return question
              }),
              param("id_encuesta").escape().trim().custom(async value=>{
                try {
                    const valueExist = await Survey.existSurvey(value);
                    // Asumimos que valueExist es un array con los resultados
                    if (valueExist[0].length > 0) {
                        return true; // Encuesta existe
                    } else {
                        throw new Error('No existe la encuesta');
                    }
                } catch (error) {
                    throw new Error(error);
                }
              })
          ]   
       }
     }
}

module.exports=validateQuestion