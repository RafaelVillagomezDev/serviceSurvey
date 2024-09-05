var express = require('express');
var router = express.Router();
const questionController=require("../../controllers/questionController")
const validateQuestion=require("../../validators/question")
const {authToken}=require("../../middlewares/Auth/authSession");


router.post('/create/:id_encuesta',authToken,validateQuestion("create"),questionController.createQuestion);
module.exports=router