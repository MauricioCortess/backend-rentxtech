// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.registro);

// Nueva Ruta Protegida: GET /api/auth/profile
// Usa el middleware verificarToken antes de llamar al controlador
router.get('/profile', verificarToken, authController.obtenerPerfil); // <-- NUEVA RUTA

module.exports = router;