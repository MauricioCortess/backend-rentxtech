// src/routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const verificarToken = require('../middlewares/authMiddleware'); // <-- IMPORTANTE

// Crear reserva
router.post('/', verificarToken, reservaController.crearReserva);

// Listar todas (Admin)
router.get('/', reservaController.listarReservasAdmin); 

// Listar MIS reservas (Requiere Token)
router.get('/mis-reservas', verificarToken, reservaController.listarMisReservas);

// PUT /api/reservas/:id/estado -> Cambiar estado (Admin)
router.put('/:id/estado', reservaController.cambiarEstadoReserva);

module.exports = router;