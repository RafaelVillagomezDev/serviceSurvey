const {body}= require('express-validator');

function validateProduct(method){
   switch (method) {
       case 'create': {
        return [ 
            body('producto','producto invalido').custom(value=>{
                const valueRol = (value=="LUZ"|| value=="GAS" || value=="DUAL") ? true:false
                return valueRol
            }).escape().trim().isLength({min:3,max:20}),

          ]   
       }
     }
}

function validateSubproduct(method){
    switch (method) {
        case 'create': {
         return [ 
             body('subproducto','subproducto invalido').matches(/^[A-Za-z\s]+$/).escape().trim().isLength({max:30}),
 
           ]   
        }
      }
 }

module.exports={validateProduct,validateSubproduct}