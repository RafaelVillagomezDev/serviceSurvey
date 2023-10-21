 const {body}= require('express-validator');
function validateAuth(method){
    switch (method) {
        case 'create': {
         return [ 
            body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
            body('name_user','nombre invalido').trim().escape().isLength({max:20}).matches(/^[A-Za-z\s]*$/),
            body('surname','apellido invalido').trim().escape().isLength({max:20}).matches(/^[A-Za-z\s]*$/),
            body('password','no es una password fuerte').isStrongPassword().escape().trim(),
           ]   
        }
        case 'login': {
          return [ 
             body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
             body('password','no es una password fuerte').isStrongPassword().escape().trim(),
            ]   
         }

      }
}

module.exports=validateAuth