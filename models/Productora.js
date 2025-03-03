// models/Productora.js

const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
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
    slogan: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Productora', productoraSchema);
