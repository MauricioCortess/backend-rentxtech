// src/routes/equipoRoutes.js
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

// Rutas para /api/equipos
router.post('/', equipoController.crearEquipo); // POST para Crear
router.get('/', equipoController.listarEquipos); // GET para Listar

module.exports = router;