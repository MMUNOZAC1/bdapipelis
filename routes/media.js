const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('generoPrincipal', 'nombre')
      .populate('directorPrincipal', 'nombre')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');

    res.json(medias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las medias' });
  }
});

router.post(
  '/',
  [
    check('serial', 'El campo serial es requerido').not().isEmpty(),
    check('modelo', 'El campo modelo es requerido').not().isEmpty(),
    check('descripcion', 'El campo descripcion es requerido').not().isEmpty(),
    check('color', 'El campo color es requerido').not().isEmpty(),
    check('añoEstreno', 'El campo debe tener un año válido').isInt({ min: 1800, max: 2100 }),
    check('generoPrincipal', 'El campo generoPrincipal es requerido').not().isEmpty(),
    check('directorPrincipal', 'El campo directorPrincipal es requerido').not().isEmpty(),
    check('productora', 'El campo productora es requerido').not().isEmpty(),
    check('tipo', 'El campo tipo es requerido').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        serial,
        modelo,
        descripcion,
        color,
        imagenPortada,
        añoEstreno,
        generoPrincipal,
        directorPrincipal,
        productora,
        tipo
      } = req.body;

      const generoValido = await Genero.findOne({ _id: generoPrincipal, estado: 'Activo' });
      if (!generoValido) return res.status(400).json({ error: 'Género inválido o inactivo' });

      const directorValido = await Director.findOne({ _id: directorPrincipal, estado: 'Activo' });
      if (!directorValido) return res.status(400).json({ error: 'Director inválido o inactivo' });

      const productoraValida = await Productora.findOne({ _id: productora, estado: 'Activo' });
      if (!productoraValida) return res.status(400).json({ error: 'Productora inválida o inactiva' });

      const tipoValido = await Tipo.findById(tipo);
      if (!tipoValido) return res.status(400).json({ error: 'Tipo inválido' });

      const nuevaMedia = new Media({
        serial,
        modelo,
        descripcion,
        color,
        imagenPortada,
        añoEstreno,
        generoPrincipal,
        directorPrincipal,
        productora,
        tipo
      });

      await nuevaMedia.save();
      res.status(201).json(nuevaMedia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al guardar la media' });
    }
  }
);

router.put(
  '/:mediaid',
  [
    check('serial', 'El campo serial es requerido').not().isEmpty(),
    check('modelo', 'El campo modelo es requerido').not().isEmpty(),
    check('descripcion', 'El campo descripcion es requerido').not().isEmpty(),
    check('color', 'El campo color es requerido').not().isEmpty(),
    check('añoEstreno', 'El campo debe tener un año válido').isInt({ min: 1800, max: 2100 }),
    check('generoPrincipal', 'El campo generoPrincipal es requerido').not().isEmpty(),
    check('directorPrincipal', 'El campo directorPrincipal es requerido').not().isEmpty(),
    check('productora', 'El campo productora es requerido').not().isEmpty(),
    check('tipo', 'El campo tipo es requerido').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const media = await Media.findById(req.params.mediaid);
      if (!media) {
        return res.status(404).json({ error: 'La media no existe' });
      }

      const {
        serial,
        modelo,
        descripcion,
        color,
        imagenPortada,
        añoEstreno,
        generoPrincipal,
        directorPrincipal,
        productora,
        tipo
      } = req.body;

      media.serial = serial;
      media.modelo = modelo;
      media.descripcion = descripcion;
      media.color = color;
      media.imagenPortada = imagenPortada;
      media.añoEstreno = añoEstreno;
      media.generoPrincipal = generoPrincipal;
      media.directorPrincipal = directorPrincipal;
      media.productora = productora;
      media.tipo = tipo;
      media.fechaActualizacion = new Date();

      await media.save();
      res.json(media);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la media' });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'La media no existe' });
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Media eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la media' });
  }
});

module.exports = router;