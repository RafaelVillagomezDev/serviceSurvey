

const createUser = () => {
    const query='INSERT INTO USUARIO (Email, Rol_user, Name_user, Surname_user, PasswD) VALUES (?, ?,?,?,?);'
    return query;
};

const existUser=()=>{
    const query='SELECT email,passwd,rol_user,name_user,surname_user FROM `usuario` WHERE `email` = ?;'
    return query;
}

module.exports={createUser,existUser}