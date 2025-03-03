// models/Media.js

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    imagenPortada: {
        type: String,
        required: false // Puedes guardar la URL de la imagen
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    generoPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero', // Referencia al modelo de Género
        required: true
    },
    directorPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director', // Referencia al modelo de Director
        required: true
    },
    productora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora', // Referencia al modelo de Productora
        required: true
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo', // Referencia al modelo de Tipo
        required: true
    }
});

module.exports = mongoose.model('Media', mediaSchema);
