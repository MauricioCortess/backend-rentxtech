// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
// Aquí podrías importar middlewares de seguridad en el futuro (ej: solo admins pueden borrar)

// GET /api/usuarios -> Listar todos
router.get('/', usuarioController.listarUsuarios);

// PUT /api/usuarios/:id -> Actualizar rol (requiere ID en la URL)
router.put('/:id', usuarioController.actualizarRolUsuario);

// DELETE /api/usuarios/:id -> Eliminar usuario (requiere ID en la URL)
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;