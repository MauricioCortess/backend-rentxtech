const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
// const verificarToken = require('../middlewares/authMiddleware'); // Recomendado para proteger

// GET /api/usuarios
router.get('/', usuarioController.listarUsuarios);

// PUT /api/usuarios/:id -> Actualizar rol
router.put('/:id', usuarioController.actualizarRolUsuario); 

// DELETE /api/usuarios/:id -> Eliminar usuario
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;