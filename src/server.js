// src/server.js
require('dotenv').config(); // Cargar variables de entorno al inicio
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Importar la configuración de la BD para que se ejecute la prueba de conexión
require('./config/db'); 

const app = express();
// Aquí le decimos: "Usa el número que está en .env, o si no hay, usa el 3000"
const PORT = process.env.PORT || 3000;

// Opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API con Swagger',
      version: '1.0.0',
      description: 'Documentación de mi API en Express',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./src/routes/*.js'], // Archivos donde defines tus endpoints
};


// --- Middlewares Globales ---
app.use(cors()); // Permitir peticiones de otros orígenes (frontend)
app.use(express.json()); // Habilitar que el servidor entienda JSON en el body
// Permitir ver las imágenes subidas en la carpeta uploads
app.use('/uploads', express.static('uploads'));

// ---> SE AGREGARON ESTAS LINEAS PARA DECIRLE A EXPRESS QUE USE ESTA RUTA PARA CONECTAR TODO EN EL SERVIDOR PRINCIPAL <---
app.use('/api/categorias', require('./routes/categoriaRoutes')); // <-- Agregar rutas de categorías
app.use('/api/equipos', require('./routes/equipoRoutes')); // <-- Agregar rutas de equipos
app.use('/api/auth', require('./routes/authRoutes')); // <-- Agregar rutas de autenticación
app.use('/api/reservas', require('./routes/reservaRoutes')); // <-- Agregar rutas de reservas
app.use('/api/usuarios', require('./routes/usuarioRoutes')); // <-- Agregar rutas de usuarios

// Generar especificación
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Montar Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Ruta de Prueba Inicial ---
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Bienvenido a la API Backend de RentxTech!',
        estado: 'Funcionando 🚀',
        version: '1.0.0'
    });
});

//Hola Mundo
// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor Express corriendo en http://localhost:${PORT}`);
    console.log('Esperando conexión a la BD...');
    console.log(`Documentación API disponible en http://localhost:${PORT}/api-docs\n`);
});