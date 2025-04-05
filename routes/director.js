const express = require('express')
const Director = require('../models/Director')
const { check, validationResult } = require('express-validator');

const router = express.Router()

router.post('/', [
  check('nombres', 'nombre invalido').not().isEmpty(),
  check('estado', 'estado invalido').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      });
    }

    const director = new Director(req.body); // ← Automáticamente toma nombres y estado
    const savedDirector = await director.save();

    res.send(savedDirector);
  } catch (error) {
    console.log(error);
    res.status(500).send('error en el servidor');
  }
});

router.get('/', async (req, res) => {
  try {
    const directores = await Director.find()
    res.send(directores)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/:nombre', async (req, res) => {
  try {
    const director = await Director.findOne({ nombre: req.params.nombre })
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.put('/:nombre', [
  check('nombre', 'nombre invalido').not().isEmpty(),
  check('estado', 'estado invalido').isIn(['Activo', 'Inactivo']),
  check('fechaCreacion', 'fechaCreacion invalido').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      });
    }

    const director = await Director.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        $set: {
          nombre: req.body.nombre,
          estado: req.body.estado,
          fechaCreacion: req.body.fechaCreacion
        }
      },
      { new: true }
    );
    res.send(director);
  } catch (error) {
    console.log(error);
    res.status(500).send('error en el servidor');
  }
});

module.exports = router