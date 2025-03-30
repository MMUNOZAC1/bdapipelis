const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: [true, 'El serial es obligatorio'],
    unique: true
  },
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  sinopsis: {
    type: String,
    required: [true, 'La sinopsis es obligatoria']
  },
  url: {
    type: String,
    required: [true, 'La URL de la película es obligatoria'],
    unique: true
  },
  imagen: {
    type: String,
    required: [true, 'La imagen de portada es obligatoria']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
  anioEstreno: {
    type: Number,
    required: [true, 'El año de estreno es obligatorio']
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero',
    required: [true, 'El género es obligatorio']
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: [true, 'El director es obligatorio']
  },
  productora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productora',
    required: [true, 'La productora es obligatoria']
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipo',
    required: [true, 'El tipo es obligatorio']
  }
});

module.exports = mongoose.model('Media', mediaSchema);