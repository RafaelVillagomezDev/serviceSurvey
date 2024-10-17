 const {body}= require('express-validator');
 const {testRegex,validateCIF, validateRol, validateRolAdmin, validateRolUser}=require("../utils/handleRegex")
function validateAuth(method,req){
    console.log(req)
    switch (method) {
        case 'create': {
         return [
            body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
            body('name_user','nombre invalido').trim().escape().isLength({max:20}).matches(/^[A-Za-z0-9]{4,}$/),
            body('surname','apellido invalido').trim().escape().isLength({max:20}).matches( /^[A-Za-z0-9]{4,}$/),
            body('password','no es una password fuerte').isStrongPassword().escape().trim(),
            body('dni','dni o nie invalido ').custom(value=>{
               const regexDni='^[0-9]{8}[A-Z]$'
               const regexNie='^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
               const dniCheck=testRegex(regexDni,value) || testRegex(regexNie,value)?true:false
               return dniCheck
            }).escape().trim(),
            body("birthday","fecha de nacimiento invalida").escape().trim().isDate(),
            body('rol','rol invalido').custom(value=>{ 
               
               return validateRolUser(value)
            }).escape().trim(),
           ]   
        }
        case 'createAdmin': {
         return [ 
            body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
            body('name_user','nombre invalido').trim().escape().isLength({max:20}).matches(/^[A-Za-z0-9]{4,}$/),
            body('surname','apellido invalido').trim().escape().isLength({max:20}).matches( /^[A-Za-z0-9]{4,}$/),
            body('password','no es una password fuerte').isStrongPassword().escape().trim(),
            body('dni','dni o nie invalido ').custom(value=>{
               const regexDni='^[0-9]{8}[A-Z]$'
               const regexNie='^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
               const dniCheck=testRegex(regexDni,value) || testRegex(regexNie,value)?true:false
               return dniCheck
            }).escape().trim(),
            body('nif','nif invalido').custom(value=>{
               const nif=validateCIF(value)
               return nif
            }).escape().trim(),
            body('tipo_compania','tipo compañia invalido').trim().escape().isAlpha(),
            body("birthday","fecha de nacimiento invalida").escape().trim().isDate(),
            body('rol','rol invalido').custom(value=>{ 
               return validateRolAdmin(value)
            }).escape().trim(),
           ]   
        }
        case 'login': {
          return [ 
             body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
             body('password','no es una password fuerte').isStrongPassword().escape().trim(),
            ]   
         }

      }
}

module.exports=validateAuth