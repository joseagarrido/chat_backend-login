const mongosse = require('mongoose');

const dbConnection = async () => {

    try {

        await mongosse.connect( process.env.DBCNN, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar base de datos');
        
    }

}

module.exports = {
    dbConnection
}