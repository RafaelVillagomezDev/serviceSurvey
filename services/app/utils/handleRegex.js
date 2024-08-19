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


const validateCIF = (cif) => {
    const cifRegex = /^[A-Z]\d{8}[A-Z]$/;
    if (!cifRegex.test(cif)) {
      return false; // Formato incorrecto
    }
  
    const letter = cif[0];
    const numbers = cif.substring(1, 9);
    const controlLetter = cif[9];
  
    const digitSum = (numbers) => {
      let sum = 0;
      // Sumar los dígitos impares
      for (let i = 0; i < 8; i += 2) {
        sum += parseInt(numbers[i], 10);
      }
  
      // Sumar los dígitos pares multiplicados por 2 y sumar sus dígitos si es > 9
      for (let i = 1; i < 8; i += 2) {
        let double = parseInt(numbers[i], 10) * 2;
        sum += (double > 9) ? (double - 9) : double;
      }
  
      return sum;
    };
  
    const calculateControlLetter = (sum) => {
      const letters = 'JABCDEFGHI';
      const controlDigit = (10 - (sum % 10)) % 10;
      return letters[controlDigit];
    };
  
    const sum = digitSum(numbers);
    const calculatedLetter = calculateControlLetter(sum);
  
    return controlLetter === calculatedLetter;
  };

module.exports={testRegex,validateRol,validateUUID , validateCIF}