const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del género es obligatorio'],
    unique: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
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
    required: [true, 'La descripción del género es obligatoria']
  }
});

module.exports = mongoose.model('Genero', generoSchema);