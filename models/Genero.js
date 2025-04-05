// models/Genero.js

const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
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
    descripcion: {
        type: String,
        required: false
    }
});

generoSchema.pre('findOneAndUpdate', function (next) {
    this.set({ fechaActualizacion: new Date() });
    next();
});

module.exports = mongoose.model('Genero', generoSchema);