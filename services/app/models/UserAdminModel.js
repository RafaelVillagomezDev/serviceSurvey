
const authService = require("../services/authServices");
const db = require("../connection/bd");
const User = require("./UserModel");
const promisePool = db.pool.promise();

class UserAdmin extends User{

    
    constructor(req){
        super(req)
    }

    

    async createUser(){
        const queryRegister = authService.createUserAdmin();
        this.req.privacy_policy=this.req.privacy_policy?1:0;
        
        const user = await promisePool.query(queryRegister, [
           this.req.email,
           this.req.rol_user,
           this.req.name_user,
           this.req.surname,
           this.req.password,
           this.req.birthday,
           this.req.nif,
           this.req.privacy_policy
         ]);

         return user
    }

    
}

module.exports=UserAdmin