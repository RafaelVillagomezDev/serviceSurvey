
const createModule=()=>{
    const query = `INSERT INTO modulo (Id_modulo,Nombre) VALUES (?,?);`;
    return query;
}

const getModule=()=>{
  const query = "SELECT * from `modulo` where Id_modulo = ?;";
  return query;
}

module.exports = {
    createModule,
    getModule
};
  