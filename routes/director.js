const express = require('express')
const Director = require('../models/Director')
const validator = require('express-validator')

const router = express.Router()

router.post('/', [
  validator.check('nombres', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo'])
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    let director = new Director();
    director.nombres = req.body.nombres;
    director.estado = req.body.estado;

    director = await director.save()
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

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
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['activo', 'inactivo'])
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    const director = await Director.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        $set: {
          nombre: req.body.nombre,
          estado: req.body.estado
        }
      },
      { new: true }
    )
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.delete('/:nombre', async (req, res) => {
  try {
    const director = await Director.findOneAndDelete({ nombre: req.params.nombre })
    res.send(director)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router
