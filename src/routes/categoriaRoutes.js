// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Definimos las rutas:
// POST /api/categorias -> Crea una categoría
router.post('/', categoriaController.crearCategoria);

// GET /api/categorias -> Lista todas
router.get('/', categoriaController.listarCategorias);

module.exports = router;