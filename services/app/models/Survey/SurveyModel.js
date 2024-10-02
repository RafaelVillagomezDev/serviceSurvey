const surveyService = require("../../services/surveyServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
class Survey {
  constructor(req) {
    const { id_encuesta,descripcion, id_container, id_usuario } = req
    
    this.id_encuesta=id_encuesta;
    this.id_encuesta = id_encuesta;
    this.descripcion = descripcion;
    this.id_container = id_container;
    this.id_usuario = id_usuario;
  }

  async getSurveys() {
    const queryExist = surveyService.getSurveys();
    const surveys = await promisePool.query(queryExist, []);

    return surveys;
  }

  async getSurveyId(){
    const queryExist = surveyService.getSurveyId();
    const survey = await promisePool.query(queryExist, [this.id_encuesta]);

    return survey;
  }

  static async existSurvey(id_encuesta) {
    const queryExistSurvey = surveyService.existSurvey();
    const survey = await promisePool.query(queryExistSurvey, [id_encuesta]);
    return survey;
  }

  async createSurvey() {
    const queryExist = surveyService.createSurvey();
    const survey = await promisePool.query(queryExist, [
      this.id_encuesta,
      this.descripcion,
      this.id_container,
      this.id_usuario,
    ]);
    return survey;
  }
}

module.exports = Survey;