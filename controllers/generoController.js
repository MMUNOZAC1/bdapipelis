const asyncHandler = require('express-async-handler');
const Genero = require('../models/Genero');

// @desc    Obtener todos los géneros
// @route   GET /api/generos
// @access  Público
const getGeneros = asyncHandler(async (req, res) => {
  const generos = await Genero.find();
  res.status(200).json(generos);
});

// @desc    Obtener un género
// @route   GET /api/generos/:id
// @access  Público
const getGenero = asyncHandler(async (req, res) => {
  const genero = await Genero.findById(req.params.id);

  if (!genero) {
    res.status(404);
    throw new Error('Género no encontrado');
  }

  res.status(200).json(genero);
});

// @desc    Crear un género
// @route   POST /api/generos
// @access  Público
const createGenero = asyncHandler(async (req, res) => {
  if (!req.body.nombre || !req.body.descripcion) {
    res.status(400);
    throw new Error('Por favor ingrese todos los campos requeridos');
  }

  const generoExiste = await Genero.findOne({ nombre: req.body.nombre });

  if (generoExiste) {
    res.status(400);
    throw new Error('El género ya existe');
  }

  const genero = await Genero.create({
    nombre: req.body.nombre,
    estado: req.body.estado || 'Activo',
    descripcion: req.body.descripcion,
  });

  res.status(201).json(genero);
});

// @desc    Actualizar un género
// @route   PUT /api/generos/:id
// @access  Público
const updateGenero = asyncHandler(async (req, res) => {
  const genero = await Genero.findById(req.params.id);

  if (!genero) {
    res.status(404);
    throw new Error('Género no encontrado');
  }

  // Actualizar fecha de actualización
  req.body.fechaActualizacion = Date.now();

  const generoActualizado = await Genero.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(generoActualizado);
});

// @desc    Eliminar un género (lógicamente)
// @route   DELETE /api/generos/:id
// @access  Público
const deleteGenero = asyncHandler(async (req, res) => {
  const genero = await Genero.findById(req.params.id);

  if (!genero) {
    res.status(404);
    throw new Error('Género no encontrado');
  }

  // Eliminación lógica cambiando estado a Inactivo
  const generoActualizado = await Genero.findByIdAndUpdate(
    req.params.id,
    { 
      estado: 'Inactivo',
      fechaActualizacion: Date.now()
    },
    { new: true }
  );

  res.status(200).json(generoActualizado);
});

module.exports = {
  getGeneros,
  getGenero,
  createGenero,
  updateGenero,
  deleteGenero,
};