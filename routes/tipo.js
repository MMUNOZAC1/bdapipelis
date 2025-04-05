const { Router } = require('express');
const TipoModel = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty().trim(),
    check('descripcion', 'invalid.descripcion').not().isEmpty().trim()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const nuevoTipo = new TipoModel({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });

        const tipoGuardado = await nuevoTipo.save();
        res.status(201).json(tipoGuardado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error servidor' });
    }
});

router.get('/', async function (req, res) {
    try {
        const tipos = await TipoModel.find();
        res.json(tipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error servidor' });
    }
});

router.put('/:tipoid', [
    check('nombre', 'invalid.nombre').not().isEmpty().trim(),
    check('descripcion', 'invalid.descripcion').not().isEmpty().trim()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = await TipoModel.findById(req.params.tipoid);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date(); // Se actualiza aquí

        tipo = await tipo.save();
        res.json(tipo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error servidor' });
    }
});

module.exports = router;