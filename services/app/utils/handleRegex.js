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
  // Expresión regular para el formato del CIF
  const cifRegex = /^[A-HJ-NP-S]\d{8}[A-Z\d]?$/;

  // Verificar el formato
  if (!cifRegex.test(cif)) {
      return false;
  }

  // Desglosar el CIF
  const letra = cif[0];
  const numeros = cif.slice(1, 9);
  const letraFinal = cif[9] || '';

  // Comprobar que los ocho primeros caracteres son dígitos
  if (!/^\d{8}$/.test(numeros)) {
      return false;
  }

  // Cálculo de la letra de control
  const calculoLetra = calcularLetraCIF(numeros);

  // Comparar la letra calculada con la letra final
  if (letraFinal && letraFinal !== calculoLetra) {
      return false;
  }

  return true;
}

function calcularLetraCIF(numeros) {
  const letras = "JABCDEFGHI";
  let suma = 0;
  let multiplicador = 2;

  // Sumar los dígitos en posiciones pares multiplicados por 2
  for (let i = 7; i >= 0; i--) {
      let digito = parseInt(numeros[i], 10);
      if (i % 2 === 1) {
          digito *= multiplicador;
          if (digito > 9) {
              digito -= 9;
          }
      }
      suma += digito;
  }

  const resto = suma % 10;
  const letraIndex = (10 - resto) % 10;

  return letras[letraIndex];
}




module.exports={testRegex,validateRolAdmin,validateRolUser,validateUUID , validateCIF}