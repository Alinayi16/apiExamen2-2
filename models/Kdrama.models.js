import mongoose from "mongoose";

const KDramaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    genero: {
        type: [String], 
        required: true
    },
    anoEstreno: {
        type: Number,
        required: true
    },
    paisOrigen: {
        type: String,
        required: true
    },
    actoresPrincipales: {
        type: [String], 
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    }
}); 

const KDrama = mongoose.model('KDrama', KDramaSchema);

export default KDrama
