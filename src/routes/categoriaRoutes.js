// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rutas CRUD Categorías
router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.listarCategorias);
router.put('/:id', categoriaController.actualizarCategoria);   // <-- Nuevo
router.delete('/:id', categoriaController.eliminarCategoria);  // <-- Nuevo

module.exports = router;