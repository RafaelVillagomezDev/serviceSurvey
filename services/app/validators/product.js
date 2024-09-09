const {body}= require('express-validator');
const { param } = require('express-validator');
function validateProduct(method){
   switch (method) {
       case 'create': {
        return [ 
          body('productos','Producto invalido').isArray(),
          body('categoria','Categoría invalida ').escape().trim().isLength({max:40}).isString(),
          body('id_container','Contenedor invalido').escape().trim().isUUID()
          ]   
       }
     }
}


module.exports={validateProduct}