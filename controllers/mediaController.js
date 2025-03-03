const asyncHandler = require('express-async-handler');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

// @desc    Obtener todas las medias
// @route   GET /api/medias
// @access  Público
const getMedias = asyncHandler(async (req, res) => {
  const medias = await Media.find()
    .populate('genero', 'nombre')
    .populate('director', 'nombres')
    .populate('productora', 'nombre')
    .populate('tipo', 'nombre');
  
  res.status(200).json(medias);
});

// @desc    Obtener una media
// @route   GET /api/medias/:id
// @access  Público
const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)
    .populate('genero')
    .populate('director')
    .populate('productora')
    .populate('tipo');

  if (!media) {
    res.status(404);
    throw new Error('Media no encontrada');
  }

  res.status(200).json(media);
});

// @desc    Crear una media
// @route   POST /api/medias
// @access  Público
const createMedia = asyncHandler(async (req, res) => {
  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagenPortada,
    anoEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  // Verificar campos requeridos
  if (!serial || !titulo || !sinopsis || !url || !imagenPortada || !anoEstreno || 
      !genero || !director || !productora || !tipo) {
    res.status(400);
    throw new Error('Por favor ingrese todos los campos requeridos');
  }

  // Verificar que el génro exista y esté activo
  const generoObj = await Genero.findById(genero);
  if (!generoObj || generoObj.estado !== 'Activo') {
    res.status(400);
    throw new Error('Género inválido o inactivo');
  }

  // Verificar que el director exista y esté activo
  const directorObj = await Director.findById(director);
  if (!directorObj || directorObj.estado !== 'Activo') {
    res.status(400);
    throw new Error('Director inválido o inactivo');
  }

  // Verificar que la productora exista y esté activa
  const productoraObj = await Productora.findById(productora);
  if (!productoraObj || productoraObj.estado !== 'Activo') {
    res.status(400);
    throw new Error('Productora inválida o inactiva');
  }

  // Verificar que el tipo exista
  const tipoObj = await Tipo.findById(tipo);
  if (!tipoObj) {
    res.status(400);
    throw new Error('Tipo inválido');
  }

  // Verificar si ya existe serial o URL
  const serialExiste = await Media.findOne({ serial });
  if (serialExiste) {
    res.status(400);
    throw new Error('El serial ya existe');
  }

  const urlExiste = await Media.findOne({ url });
  if (urlExiste) {
    res.status(400);
    throw new Error('La URL ya existe');
  }

  // Crear nueva media
  const media = await Media.create({
    serial,
    titulo,
    sinopsis,
    url,
    imagenPortada,
    anoEstreno,
    genero,
    director,
    productora,
    tipo,
  });

  res.status(201).json(media);
});

// @desc    Actualizar una media
// @route   PUT /api/medias/:id
// @access  Público
const updateMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error('Media no encontrada');
  }

  // Si se actualiza género, verificar que exista y esté activo
  if (req.body.genero) {
    const generoObj = await Genero.findById(req.body.genero);
    if (!generoObj || generoObj.estado !== 'Activo') {
      res.status(400);
      throw new Error('Género inválido o inactivo');
    }
  }

  // Si se actualiza director, verificar que exista y esté activo
  if (req.body.director) {
    const directorObj = await Director.findById(req.body.director);
    if (!directorObj || directorObj.estado !== 'Activo') {
      res.status(400);
      throw new Error('Director inválido o inactivo');
    }
  }

  // Si se actualiza productora, verificar que exista y esté activa
  if (req.body.productora) {
    const productoraObj = await Productora.findById(req.body.productora);
    if (!productoraObj || productoraObj.estado !== 'Activo') {
      res.status(400);
      throw new Error('Productora inválida o inactiva');
    }
  }

  // Si se actualiza tipo, verificar que exista
  if (req.body.tipo) {
    const tipoObj = await Tipo.findById(req.body.tipo);
    if (!tipoObj) {
      res.status(400);
      throw new Error('Tipo inválido');
    }
  }

  // Actualizar fecha de actualización
  req.body.fechaActualizacion = Date.now();

  const mediaActualizada = await Media.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(mediaActualizada);
});

// @desc    Eliminar una media
// @route   DELETE /api/medias/:id
// @access  Público
const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    res.status(404);
    throw new Error('Media no encontrada');
  }

  await Media.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

// @desc    Buscar medias por género
// @route   GET /api/medias/genero/:generoId
// @access  Público
const getMediasByGenero = asyncHandler(async (req, res) => {
  const medias = await Media.find({ genero: req.params.generoId })
    .populate('genero', 'nombre')
    .populate('director', 'nombres')
    .populate('productora', 'nombre')
    .populate('tipo', 'nombre');
  
  res.status(200).json(medias);
});

// @desc    Buscar medias por director
// @route   GET /api/medias/director/:directorId
// @access  Público
const getMediasByDirector = asyncHandler(async (req, res) => {
  const medias = await Media.find({ director: req.params.directorId })
    .populate('genero', 'nombre')
    .populate('director', 'nombres')
    .populate('productora', 'nombre')
    .populate('tipo', 'nombre');
  
  res.status(200).json(medias);
});

// @desc    Buscar medias por productora
// @route   GET /api/medias/productora/:productoraId
// @access  Público
const getMediasByProductora = asyncHandler(async (req, res) => {
  const medias = await Media.find({ productora: req.params.productoraId })
    .populate('genero', 'nombre')
    .populate('director', 'nombres')
    .populate('productora', 'nombre')
    .populate('tipo', 'nombre');
  
  res.status(200).json(medias);
});

// @desc    Buscar medias por tipo
// @route   GET /api/medias/tipo/:tipoId
// @access  Público
const getMediasByTipo = asyncHandler(async (req, res) => {
  const medias = await Media.find({ tipo: req.params.tipoId })
    .populate('genero', 'nombre')
    .populate('director', 'nombres')
    .populate('productora', 'nombre')
    .populate('tipo', 'nombre');
  
  res.status(200).json(medias);
});

module.exports = {
  getMedias,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getMediasByGenero,
  getMediasByDirector,
  getMediasByProductora,
  getMediasByTipo,
};