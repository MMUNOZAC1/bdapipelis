const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: [true, 'El nombre del director es obligatorio']
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
  }
});

module.exports = mongoose.model('Director', directorSchema);
