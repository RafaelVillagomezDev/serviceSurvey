const {body}= require('express-validator');

function validateRol(method){
   switch (method) {
       case 'create': {
        return [ 
            body('rol','rol invalido').custom(value=>{
                const valueRol = value=="admin"|| value=="user" ? true:false
                return valueRol
            }).escape().trim(),

          ]   
       }
     }
}

module.exports=validateRol