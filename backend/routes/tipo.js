const { Router } = require('express');
const Tipo = require('../models/Tipo');

const router = Router();

// LISTAR
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos" });
  }
});

// CREAR
router.post('/', async (req, res) => {
  try {
    const tipo = new Tipo({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  });

    await tipo.save();
    res.json(tipo);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el tipo" });
  }
});

// ACTUALIZAR
router.put('/:nombre', async (req, res) => {
  try {
    const tipoActualizado = await Tipo.findOneAndUpdate(
      { nombre: req.params.nombre },
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaActualizacion: new Date()
      },
      { new: true }
    );

    if (!tipoActualizado) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    res.json(tipoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el tipo" });
  }
});

// ELIMINAR
router.delete('/:nombre', async (req, res) => {
  try {
    const eliminado = await Tipo.findOneAndDelete({
      nombre: req.params.nombre
    });

    if (!eliminado) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    res.json({ message: "Tipo eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el tipo" });
  }
});

module.exports = router;
