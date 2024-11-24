var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const authController=require("../../controllers/authController")
const validateAuth=require("../../validators/auth")

router.post('/register',validateAuth("create"),authController.registerAuthUser);
router.post('/registerAdmin', validateAuth("createAdmin"),authController.registerAuthUserAdmin);
router.post('/login', validateAuth("login"),authController.loginAuthUser);
router.get('/:id_user',authToken,validateAuth("getUser"),authController.getUser);

module.exports=router