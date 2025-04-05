// models/Media.js

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    color: {
        type: String,
        unique: true,
        required: true
    },
    imagenPortada: {
        type: String,
        required: false
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
        required: true,
        min: 1800,
        max: 2100
    },
    generoPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
});

// Middleware para actualizar la fecha de actualización automáticamente
mediaSchema.pre('save', function (next) {
    this.fechaActualizacion = new Date();
    next();
});

module.exports = mongoose.model('Media', mediaSchema);