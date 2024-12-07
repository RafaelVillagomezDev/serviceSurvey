const {body}= require('express-validator');
const { param, validationResult } = require('express-validator');


function validateSubproduct(method){
   switch (method) {
       case 'create': {
        return [ 
          body('subproductos','Subproducto invalido ').isArray(),
          param('id_producto').isUUID().escape().trim()
          ]   
       }
     }
}


module.exports={validateSubproduct}