// src/server.js
require('dotenv').config(); // Cargar variables de entorno al inicio
const express = require('express');
const cors = require('cors');

// Importar la configuración de la BD para que se ejecute la prueba de conexión
require('./config/db'); 

const app = express();
// Aquí le decimos: "Usa el número que está en .env, o si no hay, usa el 3000"
const PORT = process.env.PORT || 3000;

// --- Middlewares Globales ---
app.use(cors()); // Permitir peticiones de otros orígenes (frontend)
app.use(express.json()); // Habilitar que el servidor entienda JSON en el body

// ---> SE AGREGARON ESTAS LINEAS PARA DECIRLE A EXPRESS QUE USE ESTA RUTA PARA CONECTAR TODO EN EL SERVIDOR PRINCIPAL <---
app.use('/api/categorias', require('./routes/categoriaRoutes')); // <-- Agregar rutas de categorías
app.use('/api/equipos', require('./routes/equipoRoutes')); // <-- Agregar rutas de equipos
app.use('/api/auth', require('./routes/authRoutes')); // <-- Agregar rutas de autenticación

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