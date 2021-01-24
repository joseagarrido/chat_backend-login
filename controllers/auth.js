const { response } = require('express');

const bcript = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear usuario'
            })
        }
        const usuario = new Usuario(req.body);
        //Encriptar contraseña 
        const salt = bcript.genSaltSync();
        usuario.password = bcript.hashSync(password, salt);
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario._id)

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })

    }




}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        };
        //Validad password
        const validPassword = bcript.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        //Generar token
        const token = await generarJWT(usuarioDB._id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })

    }

}

const renewToken = async (req, res = response) => {

    try {
     const usuario = await Usuario.findById(req.uid);
    const token = await generarJWT(usuario._id);
    res.json({
        ok: true,
        usuario,
        token
    });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido renovar el token'
        })
    }
    
    
}
module.exports = {
    crearUsuario,
    login,
    renewToken
};