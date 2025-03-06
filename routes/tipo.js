const { Router } = require('express');
const TipoModel = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty().trim(),
    check('descripcion', 'invalid.descripcion').not().isEmpty().trim(),
    check('fechaCreacion', 'invalid.fechaCreacion').not().isEmpty()
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const nuevoTipo = new TipoModel({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            fechaCreacion: req.body.fechaCreacion,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const tipoGuardado = await nuevoTipo.save();
        res.status(201).json(tipoGuardado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error servidor' });
    }
});

router.get('/', async function(req, res) {
    try {
        const tipos = await TipoModel.find();
        res.json(tipos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error servidor' });
    }
});

router.put('/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty().trim(),
    check('descripcion', 'invalid.descripcion').not().isEmpty().trim(),
    check('fechaCreacion', 'invalid.fechaCreacion').not().isEmpty()
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = await TipoModel.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = req.body.fechaCreacion;
        tipo.updatedAt = new Date();

        tipo = await tipo.save();
        res.json(tipo);

    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'ID no válido' });
        }
        res.status(500).json({ message: 'Error servidor' });
    }
});


module.exports = router;