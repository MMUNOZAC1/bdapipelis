const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');

// GET todos los géneros
router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.status(200).json(generos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un género por ID
router.get('/:id', async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) return res.status(404).json({ message: 'Género no encontrado' });
    res.status(200).json(genero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST crear un nuevo género
router.post('/', async (req, res) => {
  try {
    const nuevoGenero = new Genero(req.body);
    const generoGuardado = await nuevoGenero.save();
    res.status(201).json(generoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT actualizar un género
router.put('/:id', async (req, res) => {
  try {
    req.body.fechaActualizacion = Date.now();
    const generoActualizado = await Genero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!generoActualizado) return res.status(404).json({ message: 'Género no encontrado' });
    res.status(200).json(generoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE un género
router.delete('/:id', async (req, res) => {
  try {
    const generoEliminado = await Genero.findByIdAndDelete(req.params.id);
    if (!generoEliminado) return res.status(404).json({ message: 'Género no encontrado' });
    res.status(200).json({ message: 'Género eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;