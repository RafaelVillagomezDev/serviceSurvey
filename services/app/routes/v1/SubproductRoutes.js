var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const subproductController=require("../../controllers/subproductController");
const { validateSubproduct } = require('../../schemas/subproduct');



router.post('/create/:id_producto',authToken,validateSubproduct("create"),subproductController.createSubproduct);

module.exports = router