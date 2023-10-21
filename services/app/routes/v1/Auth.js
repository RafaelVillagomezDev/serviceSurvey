var express = require('express');
var router = express.Router();
const authController=require("../../controllers/authController")
const validateAuth=require("../../validators/auth")

router.post('/register', validateAuth("create"),authController.registerAuthUser);
router.post('/login', validateAuth("login"),authController.loginAuthUser);

module.exports=router