

const createUser = () => {
    const query='INSERT INTO USUARIO (Email, Rol_user, Name_user, Surname_user, PasswD,Dni,Birthday,Privacy_policy) VALUES (?,?,?,?,?,?,?,?,?);'
    return query;
};


const existUser=()=>{
    const query='SELECT email,passwd,rol_user,name_user,surname_user,dni,nif,birthday,privacy_policy FROM `usuario` WHERE `email` = ?;'
    return query;
}

module.exports={createUser,existUser}