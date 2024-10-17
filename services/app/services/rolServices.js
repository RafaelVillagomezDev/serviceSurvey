const getRol = () => {
    const query = `
         SELECT Rol_Value from rol where Rol_Value=?
    `;
    return query;
};

const createRol=()=>{
    const query = `INSERT INTO rol (Rol_Value) VALUES (?);`;
    return query;
}

module.exports = {
    getRol,createRol
};
  