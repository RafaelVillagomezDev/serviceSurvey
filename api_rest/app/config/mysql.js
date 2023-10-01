const mysql= require('mysql');
 const dbConnection = async() => {
    var connection =  mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE
    });
   
    return connection;
}

module.exports={
    dbConnection
}
