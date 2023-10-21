const existSubproduct = () => {
    const query = 'SELECT * from `subproduct` WHERE `id_subproducto` = ? AND `val_producto` = ?;';
    return query;
  };
  
  module.exports = {
    existSubproduct,
   
  };
  