const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la productora es obligatorio'],
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
  slogan: {
    type: String
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción de la productora es obligatoria']
  }
});

module.exports = mongoose.model('Productora', productoraSchema);
