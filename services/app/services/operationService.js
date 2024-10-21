
const createOperation=()=>{
    const query = `INSERT INTO operacion (Id_modulo,Nombre) VALUES (?,?);`;
    return query;
}

module.exports = {
    createOperation
};
  