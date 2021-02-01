const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controllers/socket')


// Mensajes de Sockets
io.on('connection', client => {
    

    //comrobar token
    const[valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) {
        return client.disconnect();
    }

    usuarioConectado(uid);

   
    client.join(uid);
    console.log('Cliente conectado: ',uid);
    //Escuchar del cliente el mensaje-personal
    client.on('mensajepersonal',async (payload)=>{
        await grabarMensaje(payload);

        io.to(payload.para).emit('mensajepersonal',payload);
    })



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
