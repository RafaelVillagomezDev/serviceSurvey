
const authService = require("../services/authServices");
const db = require("../connection/bd");
const promisePool = db.pool.promise();

class User{

    
    constructor(req){
        this.req=req;
       
    }

     async existUser (){
        const queryExist = authService.existUser();
        const existUser = await promisePool.query(queryExist, [this.req.email]);
        return existUser
    }

    async createUser(){
        const queryRegister = authService.createUser();
        this.req.privacy_policy=this.req.privacy_policy?1:0;
        const user = await promisePool.query(queryRegister, [
           this.req.email,
           this.req.rol_user,
           this.req.name_user,
           this.req.surname,
           this.req.password,
           this.req.birthday,
           this.req.dni,
           this.req.privacy_policy
         ]);

         return user
    }

    
}

module.exports=User