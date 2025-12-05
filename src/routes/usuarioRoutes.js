const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
// const verificarToken = require('../middlewares/authMiddleware'); // Recomendado para proteger

// GET /api/usuarios
router.get('/', usuarioController.listarUsuarios);

module.exports = router;