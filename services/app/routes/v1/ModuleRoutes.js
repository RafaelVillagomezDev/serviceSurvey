var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const moduleController=require("../../controllers/moduleController");
const { validateModule } = require('../../validators/module');
const {verifyRolRoot}=require("../../middlewares/Auth/verifyRol");



router.post('/create',authToken,verifyRolRoot,validateModule("create"),moduleController.createModule);

module.exports = router