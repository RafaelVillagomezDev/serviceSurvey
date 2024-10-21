var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const operationController=require("../../controllers/operationController");
const { validateModule } = require('../../validators/module');
const {verifyRolRoot}=require("../../middlewares/Auth/verifyRol");



router.post('/create',authToken,verifyRolRoot,validateModule("create"), operationController.createOperation);

module.exports = router