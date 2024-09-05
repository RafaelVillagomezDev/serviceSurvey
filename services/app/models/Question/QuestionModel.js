const productService = require("../../services/productService");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();

class Question {
  constructor(id_pregunta,pregunta_text) {
    this.id_pregunta = id_pregunta;
    this.pregunta_text = pregunta_text;
  }
  

}

module.exports = Question;
