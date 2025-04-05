// models/Tipo.js

const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Tipo', tipoSchema);
