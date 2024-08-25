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

const validateRolAdmin=(rol)=>{
    if(rol=="admin"){
        return true 
    }
    return false
}


const validateRolUser=(rol)=>{
  if(rol=="user"){
      return true 
  }
  return false
}


/*
 Funcion: recibe un parametro y verifica si es un UUID y esta en el formato correcto
 return :boolean
*/

const validateUUID=(param)=>{
    return uuidValidate(param)?true:false

}



function validateCIF(cif) {
    // Expresión regular para el formato del CIF: 1 letra, 8 dígitos, 1 carácter de control (letra o número)
    const cifRegex = /^[A-HJ-NP-S]\d{8}[A-Z\d]?$/;

    // Verificar el formato
    if (!cifRegex.test(cif)) {
        return false;
    }

    // Desglosar el CIF
    const letra = cif[0];
    const numeros = cif.slice(1, 9); // Los 8 dígitos del CIF
    const control = cif[9] || ''; // El carácter de control (puede ser opcional en algunos casos)

    // Calcular el dígito o letra de control
    const calculoControl = calcularControlCIF(letra, numeros);

    // Comparar el dígito/letra calculada con el carácter de control
    if (control && control !== calculoControl) {
        return false;
    }

    return true;
}

function calcularControlCIF(letra, numeros) {
    let sumaPares = 0;
    let sumaImpares = 0;

    // Procesar los números
    for (let i = 0; i < numeros.length; i++) {
        const digito = parseInt(numeros[i], 10);

        if (i % 2 === 1) { // Posiciones impares (en base 0)
            sumaPares += digito;
        } else { // Posiciones pares (en base 0)
            let doble = digito * 2;
            if (doble > 9) {
                doble -= 9;
            }
            sumaImpares += doble;
        }
    }

    const sumaTotal = sumaPares + sumaImpares;
    const unidad = sumaTotal % 10;
    const digitoControl = unidad === 0 ? 0 : 10 - unidad;

    // Determinar el carácter de control según la letra inicial
    if ('KLMNPQRSW'.includes(letra)) {
        // Empresas cuya letra de control es una letra
        return "JABCDEFGHI"[digitoControl];
    } else {
        // Empresas cuya letra de control es un número
        return digitoControl.toString();
    }
}



module.exports={testRegex,validateRolAdmin,validateRolUser,validateUUID , validateCIF}