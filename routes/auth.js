// path: api/login

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jws');
const router = Router();

router.post('/new',[
    check('nombre','Nombre es obligatorio').notEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validarCampos 
    ],   
    crearUsuario);

    router.post('/',[
        
        check('email','El email no es valido').isEmail(),
        check('password','El password es obligatorio').notEmpty(),
        validarCampos 
        ],   
        login);
    router.get('/renew',validarJWT, renewToken);

module.exports = router;