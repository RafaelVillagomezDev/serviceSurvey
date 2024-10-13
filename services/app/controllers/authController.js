const db = require("../connection/bd");
const { matchedData, validationResult } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handeJwt");
const User = require("../models/Users/UserModel");
const UserAdmin = require("../models/Users/UserAdminModel");
const { v4: uuidv4 } = require("uuid");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario con detalles de autenticación y devuelve un token JWT al registrarse exitosamente.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_rol
 *               - email
 *               - name_user
 *               - surname
 *               - password
 *               - dni
 *               - birthday
 *               
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *               id_rol:
 *                 type: string
 *                 description: Identificador de rol.
 *               dni:
 *                 type: string
 *                 description: DNI o Nie (Número de Identificación Nacional) del usuario.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario.
 *               name_user:
 *                 type: string
 *                 description: Nombre del usuario.
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 token:
 *                   type: string
 *                   description: Token JWT para sesiones autenticadas.
 *       401:
 *         description: No autorizado - El usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Entidad no procesable - Errores de validación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Error Interno del Servidor - Fallo en el registro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const registerAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const authObj = {
      id_user: await uuidv4(),
      password: passwordHash,
    };
    const dataBody = { ...req, ...authObj };
    req = dataBody;

    const user = new User(req);

    const existUser = await user.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await user.createUser(req);

    if (newUsers[0].affectedRows > 0) {

      const {password,dni,birthday,...dataToken}=req;

      const token = await tokenSign(dataToken);

      res.status(201).send({
        status: 200,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al registrar usuario");
  }
};
/**
 * @swagger
 * /api/v1/auth/registerAdmin:
 *   post:
 *     summary: Registrar un nuevo usuario de tipo administrador
 *     description: Registra un nuevo usuario administrador con detalles de autenticación y devuelve un token JWT al registrarse exitosamente.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_rol
 *               - email
 *               - name_user
 *               - surname
 *               - password
 *               - dni
 *               - birthday
 *               - tipo_compania
 *               - nif
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *               id_rol:
 *                 type: string
 *                 description: Identificador de rol.
 *               dni:
 *                 type: string
 *                 description: DNI o Nie (Número de Identificación Nacional) del usuario.
 *               nif:
 *                 type: string
 *                 description: NIF (Número de Identificación Nacional fiscal).
 *               tipo_compania:
 *                 type: string
 *                 description: Tipo de compañia de empresa 
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario.
 *               name_user:
 *                 type: string
 *                 description: Nombre del usuario.
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 token:
 *                   type: string
 *                   description: Token JWT para sesiones autenticadas.
 *       401:
 *         description: No autorizado - El usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Entidad no procesable - Errores de validación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Error Interno del Servidor - Fallo en el registro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const registerAuthUserAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const authObj = {
      password: passwordHash,
      id_user: await uuidv4(),
      id_admin: await uuidv4(),
    };
    const dataBody = { ...req,...authObj };
    req = dataBody;

    const user = new User(req);

    const existUser = await user.existUser(req);

    if (existUser[0].length > 0) {
      handleHttpError(res, "El usuario ya existe", 401);
      return;
    }

    const newUsers = await user.createUser(req);

    if (newUsers[0].affectedRows > 0) {
      const admin = new UserAdmin(req);
      const newAdmin = await admin.createUser(req);

      if (newAdmin[0].affectedRows > 0) {
        const {password,dni,id_admin,fecha_nacimiento,apellido,nif,...dataToken}=req;

        const token = await tokenSign(dataToken);

        res.status(201).send({
          status: 200,
          token: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error al registrar usuario");
  }
};

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Autentica a un usuario con sus credenciales (email y contraseña) y devuelve un token JWT si las credenciales son correctas.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario.
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *                 example: contraseñaSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Se devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 token:
 *                   type: string
 *                   description: Token JWT para sesiones autenticadas.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: No autorizado - El usuario no existe o las credenciales son incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Entidad no procesable - Error de validación en los datos proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


const loginAuthUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    req = matchedData(req);

    const dataBody = { ...req };
    const { password } = dataBody;

    const user = new User(req);
    const existUser = await user.existUser();

    if (existUser.length == 0) {
      handleHttpError(res, "El usuario no existe", 401);
      return;
    }

    const hashPassword = existUser[0][0].Passwd;

    const verifyCredentials = await compare(password, hashPassword);

    if (!verifyCredentials) {
      handleHttpError(res, "la contraseña es incorrecta", 401);
      return;
    }

    const dataToken = {
      id_user: existUser[0][0].Id_usuario,
      name_user: existUser[0][0].Nombre_user,
      id_rol: existUser[0][0].Id_rol,
    }; 

   

    const token = await tokenSign(dataToken);

    res.send({
      status: 200,
      token: token,
    });
  } catch (error) {
    handleHttpError(res, "Error al logearse el usuario");
  }
};

module.exports = {
  registerAuthUser,
  loginAuthUser,
  registerAuthUserAdmin,
};
