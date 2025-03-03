// server.js

const express = require('express');
const connectDB = require('./config/bd');  // Asegúrate de que la ruta sea correcta

const app = express();

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

// Inicia el servidor en el puerto 5000
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
