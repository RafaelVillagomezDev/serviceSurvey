const bcrypt=require("bcrypt")

/*
  Funcion: recibe password sin encriptar 
  return: devuelve password encriptada con hash y salt aleatorio de 12
*/
const encrypt=async(password)=>{
    const hash=await bcrypt.hash(password,12)
    return hash
}
/*
  Funcion: recibe password sin encriptar y encriptada 
  return: devuelve true o false
*/

const compare=async(password,hashPassword)=>{
  return bcrypt.compare(password,hashPassword)
}

module.exports={encrypt,compare}