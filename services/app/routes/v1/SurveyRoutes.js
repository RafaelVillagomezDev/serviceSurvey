var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const surveyController=require("../../controllers/surveyController");
const validateSurvey=require("../../validators/survey");


router.get('/',authToken,surveyController.getSurveys);
router.post('/create',authToken,validateSurvey("create"),surveyController.createSurvey );
router.delete('/delete/:id_encuesta',authToken,validateSurvey("delete"),surveyController.deleteSurvey );
router.put('/update',authToken,validateSurvey("update"),surveyController.updateSurvey);
module.exports = router