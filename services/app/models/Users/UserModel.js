
const authService = require("../../services/authServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const { v4: uuidv4 } = require("uuid");


class User{

    
    constructor(req){
        this.req = req
    }

    async existUser (){
        const queryExist = authService.existUser();
        const existUser = await promisePool.query(queryExist, [this.req.email]);
        return existUser
    }

    async createUser(){
        const queryRegister = authService.createUser();
        const user = await promisePool.query(queryRegister, [
           this.req.id_rol,
           this.req.id_user,
           this.req.email,
           this.req.name_user,
           this.req.surname,
           this.req.password,
           this.req.birthday,
           this.req.dni
         ]);

         return user
    }

    
}

module.exports=User