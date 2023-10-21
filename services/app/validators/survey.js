const {body,param}= require('express-validator');
const {testRegex,validateUUID}=require("../utils/handleRegex")
function validateSurvey(method){
   switch (method) {
       case 'create': {
        return [ 
               body('dni','dni o nie invalido ').custom(value=>{
                    const regexDni='^[0-9]{8}[A-Z]$'
                    const regexNie='^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
                    const dniCheck=testRegex(regexDni,value) || testRegex(regexNie,value)?true:false
                    return dniCheck
               }).escape().trim(),
               body('mantenimiento','mantenimiento opciones invalido').custom(value=>{
                    const valueMaintenance = (value=="si"|| value=="no" || value=="SI"|| value=="NO") ? true:false
                    return valueMaintenance
               }).escape().trim(),
               body('tipo_mantenimiento',' tipo de mantenimiento invalido').escape().trim().isLength({max:40}).matches(/^[A-Za-z\s]*$/),
               body('estado','invalid state').custom(value=>{
               const valueState = (value=="VENDIDO"|| value=="EN PROCESO" || value=="NO VENDIDO" ||value=="NO VÁLIDO" ) ? true:false
                    return valueState
               }).escape().trim(),
                body('producto','producto invalido').custom(value=>{
                const valueRol = (value=="LUZ"|| value=="GAS" || value=="DUAL") ? true:false
                return valueRol
               }).escape().trim().isLength({max:20}),
               body('id_subproducto','id_subproducto invalido').toInt().escape().trim(),
               
          ]   
       }
       case 'delete': {
          return [ 
                 param('id_encuesta','Id encuesta debe ser un UUID').custom(value=>{
                      const uuid=validateUUID(value)
                      return uuid
                 }).escape().trim(),
            ]   
         }
       case 'update':{
          return [ 
               body('dni','dni o nie invalido ').custom(value=>{
                    const regexDni='^[0-9]{8}[A-Z]$'
                    const regexNie='^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
                    const dniCheck=testRegex(regexDni,value) || testRegex(regexNie,value)?true:false
                    return dniCheck
               }).escape().trim(),
               body('mantenimiento','mantenimiento opciones invalido').custom(value=>{
                    const valueMaintenance = (value=="si"|| value=="no" || value=="SI"|| value=="NO") ? true:false
                    return valueMaintenance
               }).escape().trim(),
               body('tipo_mantenimiento',' tipo de mantenimiento invalido').escape().trim().isLength({max:40}).matches(/^[A-Za-z\s]*$/),
               body('estado','invalid state').custom(value=>{
               const valueState = (value=="VENDIDO"|| value=="EN PROCESO" || value=="NO VENDIDO" ||value=="NO VÁLIDO" ) ? true:false
                    return valueState
               }).escape().trim(),
                body('producto','producto invalido').custom(value=>{
                const valueRol = (value=="LUZ"|| value=="GAS" || value=="DUAL") ? true:false
                return valueRol
               }).escape().trim().isLength({max:20}),
               body('id_subproducto','id_subproducto invalido').toInt().escape().trim(),
               
          ]  
       }
     }
}

module.exports=validateSurvey