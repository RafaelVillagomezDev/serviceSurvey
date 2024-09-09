var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const containerController=require("../../controllers/containerController");
const { validateContainer } = require('../../validators/container');




router.post('/create',authToken,validateContainer("create"),containerController.createContainer);

module.exports = router