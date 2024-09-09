const createContainer = () => {
    const query ="INSERT INTO container_product(Id_container) VALUES (?);";
    return query;
};

module.exports = {

  createContainer,
};
