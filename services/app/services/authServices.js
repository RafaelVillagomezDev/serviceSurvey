

const createUser = () => {
    const query = 'INSERT INTO USUARIO (Rol_value,Id_usuario,Email,Nombre_user,Apellido_user,Passwd,Fecha_nacimiento,Dni) VALUES (?,?,?,?,?,?,?,?);';
    return query;
};

const createUserAdmin = () => {
    const query = 'INSERT INTO ADMIN (Id_admin,Id_usuario,Nif,Tipo_compania) VALUES (?,?,?,?);';
    return query;
};



const existUser=()=>{
    const query='SELECT * FROM `usuario` WHERE `email` = ?;'
    return query;
}

module.exports={createUser,existUser,createUserAdmin}