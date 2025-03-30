const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del tipo es obligatorio'],
    unique: true
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
    required: [true, 'La descripción del tipo es obligatoria']
  }
});

module.exports = mongoose.model('Tipo', tipoSchema);
