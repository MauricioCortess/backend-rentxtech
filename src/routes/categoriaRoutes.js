// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rutas CRUD Categorías

/**
 * @swagger
 * /api/categorias/:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags:
 *       - Categorías
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 */
router.post('/', categoriaController.crearCategoria);


/**
 * @swagger
 * /api/categorias/:
 *   get:
 *     summary: Listar todas las categorías
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', categoriaController.listarCategorias);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
router.put('/:id', categoriaController.actualizarCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */
router.delete('/:id', categoriaController.eliminarCategoria);  // <-- Nuevo

module.exports = router;