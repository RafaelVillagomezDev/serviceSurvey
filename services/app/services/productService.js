const existProduct = () => {
    const query = 'SELECT * from `product` WHERE `producto` = ?;';
    return query;
  };
  
  module.exports = {
    existProduct,
   
  };
  