var express = require('express');
var router = express.Router();
const userController=require("../../controllers/userControllers")

const middlewareHeader=require("../../middlewares/customHeader")
// In src/controllers/userController.js

/* GET home page. */
router.get('/',userController.getAllUsers);

router.post('/data', userController.getOneUser);

router.post('/:userId', userController.createNewUser);

router.patch('/:userId', userController.updateOneUser);

router.delete('/:userId', userController.deleteOneUser);



module.exports = router