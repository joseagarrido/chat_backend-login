// path: api/mensajes

const {Router} = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar_jws');

const router = Router();

router.get('/:de',validarJWT, obtenerChat);

module.exports = router;