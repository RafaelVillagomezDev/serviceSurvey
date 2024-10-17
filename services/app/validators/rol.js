const {body}= require('express-validator');

function validateRol(method){
   switch (method) {
       case 'create': {
        return [ 
            body('rol','rol invalido').escape().trim().isString(),

          ]   
       }
     }
}

module.exports=validateRol