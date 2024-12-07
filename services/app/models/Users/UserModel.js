
const authService = require("../../services/authServices");
const db = require("../../connection/bd");
const promisePool = db.pool.promise();
const { v4: uuidv4 } = require("uuid");


class User{

    
    constructor({rol,id_user,email,name_user,surname,password,birthday,dni}){
        this.rol=rol;
        this.id_user=id_user;
        this.email=email;
        this.name_user=name_user;
        this.surname=surname;
        this.password=password;
        this.birthday=birthday;
        this.dni=dni;
    }

    async existUser(){
        const queryExist = authService.existUser();
        const existUser = await promisePool.query(queryExist, [this.email]);
        return existUser
    }

  
    async createUser() {
        try {
            console.time("insertUserQuery");  // Inicia el cronómetro
    
            const queryRegister = authService.createUser();
            const user = await promisePool.query(queryRegister, [
                this.rol,
                this.id_user,
                this.email,
                this.name_user,
                this.surname,
                this.password,
                this.birthday,
                this.dni
            ]);
    
            console.timeEnd("insertUserQuery");  // Finaliza el cronómetro y muestra el tiempo en la consola
    
            return user;
        } catch (error) {
            console.error("Error en la creación del usuario:", error);
            throw error;
        }
    }
    

    async getUserId(){
        const queryExist = authService.searchUserId();
        const user = await promisePool.query(queryExist, [this.id_user]);
        return user
    }

    
}

module.exports=User