var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const authController=require("../../controllers/authController");
const { create, login, getUser } = require('../../schemas/auth');


router.post('/register',create,(req,res)=>authController.registerAuthUser(req,res));
router.post('/login', login,(req,res)=>authController.loginAuthUser(req,res));
router.get('/:id_user',getUser,authToken,(req,res)=>authController.getUser(req,res));

module.exports=router