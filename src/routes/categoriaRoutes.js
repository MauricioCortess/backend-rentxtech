// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Definimos las rutas:
// POST /api/categorias -> POST para crear una categoría
router.post('/', categoriaController.crearCategoria);

// GET /api/categorias -> GET para listar todas
router.get('/', categoriaController.listarCategorias);

module.exports = router;