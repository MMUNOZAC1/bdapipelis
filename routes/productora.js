const express = require('express')
const Productora = require('../models/Productora')
const validator = require('express-validator')

const router = express.Router()

router.post('/', [
  validator.check('nombre', 'nombre invalido').not().isEmpty(),
  validator.check('estado', 'estado invalido').isIn(['Activo', 'Inactivo']),
  validator.check('descripcion', 'descripcion invalido').not().isEmpty(),
  validator.check('fechaCreacion', 'fechaCreacion invalida').not().isEmpty(),
  validator.check('fechaActualizacion', 'fechaActualizacion invalida').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()
      })
    }

    let productora = new Productora();
    productora.nombre = req.body.nombre;
    productora.estado = req.body.estado;
    productora.descripcion = req.body.descripcion;
    productora.fechaCreacion = req.body.fechaCreacion;
    productora.fechaActualizacion = req.body.fechaActualizacion;


    productora = await productora.save()
    res.send(productora)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find()
    res.send(productoras)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
  }
})

module.exports = router;