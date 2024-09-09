const createContainer = () => {
    const query ="INSERT INTO container_product(Id_container,Id_usuario) VALUES (?,?);";
    return query;
};

module.exports = {

  createContainer,
};
