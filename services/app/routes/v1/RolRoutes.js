var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const {verifyRolAdmin}=require("../../middlewares/Auth/verifyRol");
const routeController=require("../../controllers/rolController");
const validateRol = require('../../validators/rol');



router.post('/create',authToken,verifyRolAdmin,validateRol("create"),routeController.createRol);

module.exports = router