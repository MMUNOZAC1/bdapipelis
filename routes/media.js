const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

// GET todos los medias
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    res.status(200).json(medias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un media por ID
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    if (!media) return res.status(404).json({ message: 'Media no encontrado' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST crear un nuevo media
router.post('/', async (req, res) => {
  try {
    // Verificar que los elementos relacionados existen y están activos
    const genero = await Genero.findById(req.body.genero);
    if (!genero || genero.estado !== 'Activo') {
      return res.status(400).json({ message: 'El género no existe o no está activo' });
    }

    const director = await Director.findById(req.body.director);
    if (!director || director.estado !== 'Activo') {
      return res.status(400).json({ message: 'El director no existe o no está activo' });
    }

    const productora = await Productora.findById(req.body.productora);
    if (!productora || productora.estado !== 'Activo') {
      return res.status(400).json({ message: 'La productora no existe o no está activa' });
    }

    const tipo = await Tipo.findById(req.body.tipo);
    if (!tipo) {
      return res.status(400).json({ message: 'El tipo no existe' });
    }

    const nuevoMedia = new Media(req.body);
    const mediaGuardado = await nuevoMedia.save();
    
    // Poblar los datos relacionados para la respuesta
    const mediaCompleto = await Media.findById(mediaGuardado._id)
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    
    res.status(201).json(mediaCompleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT actualizar un media
router.put('/:id', async (req, res) => {
  try {
    // Si se están actualizando las referencias, verificar que existen y están activos
    if (req.body.genero) {
      const genero = await Genero.findById(req.body.genero);
      if (!genero || genero.estado !== 'Activo') {
        return res.status(400).json({ message: 'El género no existe o no está activo' });
      }
    }

    if (req.body.director) {
      const director = await Director.findById(req.body.director);
      if (!director || director.estado !== 'Activo') {
        return res.status(400).json({ message: 'El director no existe o no está activo' });
      }
    }

    if (req.body.productora) {
      const productora = await Productora.findById(req.body.productora);
      if (!productora || productora.estado !== 'Activo') {
        return res.status(400).json({ message: 'La productora no existe o no está activa' });
      }
    }

    if (req.body.tipo) {
      const tipo = await Tipo.findById(req.body.tipo);
      if (!tipo) {
        return res.status(400).json({ message: 'El tipo no existe' });
      }
    }

    req.body.fechaActualizacion = Date.now();
    const mediaActualizado = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');

    if (!mediaActualizado) return res.status(404).json({ message: 'Media no encontrado' });
    res.status(200).json(mediaActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE un media
router.delete('/:id', async (req, res) => {
  try {
    const mediaEliminado = await Media.findByIdAndDelete(req.params.id);
    if (!mediaEliminado) return res.status(404).json({ message: 'Media no encontrado' });
    res.status(200).json({ message: 'Media eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;