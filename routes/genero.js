// routes/generoRoutes.js

const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');

// Crear un nuevo género
router.post('/', async (req, res) => {
    try {
        const genero = new Genero(req.body);
        await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
