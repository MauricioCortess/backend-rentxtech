// src/server.js
require('dotenv').config(); // Cargar variables de entorno al inicio
const express = require('express');
const cors = require('cors');

// Importar la configuración de la BD para que se ejecute la prueba de conexión
require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3306;

// --- Middlewares Globales ---
app.use(cors()); // Permitir peticiones de otros orígenes (frontend)
app.use(express.json()); // Habilitar que el servidor entienda JSON en el body

// --- Ruta de Prueba Inicial ---
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Bienvenido a la API Backend de RentxTech!',
        estado: 'Funcionando 🚀',
        version: '1.0.0'
    });
});

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor Express corriendo en http://localhost:${PORT}`);
    console.log('Esperando conexión a la BD...');
});