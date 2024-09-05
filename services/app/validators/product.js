const {body}= require('express-validator');

function validateProduct(method){
   switch (method) {
       case 'create': {
        return [ 
          body('producto','Producto invalido ').escape().trim().isLength({max:40}).isString(),
          ]   
       }
     }
}


module.exports={validateProduct}