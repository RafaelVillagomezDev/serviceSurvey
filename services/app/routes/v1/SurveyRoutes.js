var express = require('express');
var router = express.Router();
const {authToken,authCredentials}=require("../../middlewares/Auth/authSession")
const surveyController=require("../../controllers/surveyController")
const validateSurvey=require("../../validators/survey")

router.get('/',authToken,surveyController.getSurvey);
router.post('/create',validateSurvey("create"),authToken,surveyController.createSurvey );
router.delete('/delete/:id_encuesta',authToken,authCredentials,validateSurvey("delete"),surveyController.deleteSurvey );
router.put('/update',authToken,authCredentials,validateSurvey("update"),surveyController.updateSurvey);
module.exports = router