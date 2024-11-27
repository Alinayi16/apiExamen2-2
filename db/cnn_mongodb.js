import mongoose from "mongoose";

let isConected = false;

const conectarAMongoDB = async () => {
    if (isConected) {
        console.log('Ya está conectado a MongoDB'.green);
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI); // Sin opciones obsoletas
        isConected = true;
        console.log('Conectado a MongoDB'.green);
    } catch (error) {
        console.error('Error al conectar a MongoDB'.red, error);
    }
};

const db = mongoose.connection;

db.on('error', (error) => {
    isConected = false;
    console.log('Error al conectar a MongoDB'.red, error);
});

db.once('open', () => {
    isConected = true;
});

db.on('disconnected', () => {
    isConected = false;
    console.log('Desconectado de MongoDB'.yellow);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado'.yellow);
    process.exit(0);
});

export { conectarAMongoDB, isConected };



