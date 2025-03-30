const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

// GET todos los directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    res.status(200).json(directores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un director por ID
router.get('/:id', async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ message: 'Director no encontrado' });
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST crear un nuevo director
router.post('/', async (req, res) => {
  try {
    const nuevoDirector = new Director(req.body);
    const directorGuardado = await nuevoDirector.save();
    res.status(201).json(directorGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT actualizar un director
router.put('/:id', async (req, res) => {
  try {
    req.body.fechaActualizacion = Date.now();
    const directorActualizado = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!directorActualizado) return res.status(404).json({ message: 'Director no encontrado' });
    res.status(200).json(directorActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE un director
router.delete('/:id', async (req, res) => {
  try {
    const directorEliminado = await Director.findByIdAndDelete(req.params.id);
    if (!directorEliminado) return res.status(404).json({ message: 'Director no encontrado' });
    res.status(200).json({ message: 'Director eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;