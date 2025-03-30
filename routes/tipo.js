const express = require('express');
const router = express.Router();
const Productora = require('../models/Productora');

// GET todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.status(200).json(productoras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET una productora por ID
router.get('/:id', async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json(productora);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST crear una nueva productora
router.post('/', async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body);
    const productoraGuardada = await nuevaProductora.save();
    res.status(201).json(productoraGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT actualizar una productora
router.put('/:id', async (req, res) => {
  try {
    req.body.fechaActualizacion = Date.now();
    const productoraActualizada = await Productora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoraActualizada) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json(productoraActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE una productora
router.delete('/:id', async (req, res) => {
  try {
    const productoraEliminada = await Productora.findByIdAndDelete(req.params.id);
    if (!productoraEliminada) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json({ message: 'Productora eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;