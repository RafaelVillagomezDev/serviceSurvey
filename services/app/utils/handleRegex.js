const { v4:uuidv4 } = require('uuid');
const { validate :uuidValidate } =require('uuid');
/*
 Funcion : recoge una regex y el un valor a testear
 return params: boolean
*/

const testRegex=(regex,value)=>{
    let regexTest= new RegExp(regex);
    if(regexTest.test(value)){
        return true
    }else {
        return false
    }


}
/*
 Funcion: recibe el email despues de haber pasado las correspondientes validaciones
 return: boolean
 extra: Esta funcion la usaremos para decidir el rol del usuario
*/

const validateRol=(email)=>{
    const dominioEmail=email.split("@")[1]
    return dominioEmail=="accom.com"?true:false
}

/*
 Funcion: recibe un parametro y verifica si es un UUID y esta en el formato correcto
 return :boolean
*/

const validateUUID=(param)=>{
    return uuidValidate(param)?true:false

}

module.exports={testRegex,validateRol,validateUUID}