const surveyService = require("../../services/surveyServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
class Survey {
  constructor(id_encuesta,id_producto,descripcion) {
    this.id_encuesta = id_encuesta;
    this.id_producto = id_producto;
    this.descripcion=descripcion;
  }

  async getSurveys() {
    const queryExist = surveyService.getSurveys();
    const surveys = await promisePool.query(queryExist, []);

    return surveys;
  }

  static async existSurvey(id_encuesta){
    const queryExistSurvey=surveyService.existSurvey();
    const survey=await promisePool.query(queryExistSurvey,[id_encuesta])
    return survey
  }

  async createSurvey() {
    const queryExist = surveyService.createSurvey();
    const survey = await promisePool.query(queryExist,[this.id_encuesta,this.id_producto,this.descripcion]);
    return survey;
  }
}

module.exports = Survey;
