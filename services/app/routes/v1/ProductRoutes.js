var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession");
const productController=require("../../controllers/productController");
const { validateProduct } = require('../../validators/product');



router.post('/create',authToken,validateProduct("create"),productController.createProduct);


module.exports = router