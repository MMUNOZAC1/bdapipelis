const express = require('express');
const Productora = require('../models/Productora');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post('/', [
  check('nombre', 'nombre inválido').not().isEmpty(),
  check('estado', 'estado inválido').isIn(['Activo', 'Inactivo']),
  check('descripcion', 'descripción inválida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { nombre, estado, descripcion, slogan } = req.body;

    const productora = new Productora({
      nombre,
      estado,
      descripcion,
      slogan
    });

    await productora.save();
    res.status(201).json(productora);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

router.put('/:productoraid', [
  check('nombre', 'nombre inválido').not().isEmpty(),
  check('estado', 'estado inválido').isIn(['Activo', 'Inactivo']),
  check('descripcion', 'descripción inválida').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const productora = await Productora.findById(req.params.productoraid);
    if (!productora) {
      return res.status(404).json({ mensaje: 'Productora no encontrada' });
    }

    const { nombre, estado, descripcion, slogan } = req.body;

    productora.nombre = nombre;
    productora.estado = estado;
    productora.descripcion = descripcion;
    productora.slogan = slogan;
    productora.fechaActualizacion = new Date();

    await productora.save();
    res.json(productora);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;