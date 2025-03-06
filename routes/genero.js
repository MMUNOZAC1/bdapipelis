const express = require('express')
const Genero = require('../models/Genero')
const validator = require('express-validator')

const router = express.Router()

router.post('/', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo']),
  validator.check('descripcion', 'descripcion invalido').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    let genero = new Genero();
    genero.nombre = req.body.nombre;
    genero.estado = req.body.estado;
    genero.descripcion = req.body.descripcion;


    genero = await genero.save()
    res.send(genero)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find()
    res.send(generos)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router;