// src/routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const verificarToken = require('../middlewares/authMiddleware'); // <-- IMPORTANTE

/**
 * @swagger
 * /api/reservas/:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         aplication/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 description: ID del usuario (debe existir en la base de datos)
 *               equipo_id:
 *                 type: integer
 *                 description: ID del equipo a reservar (debe ser un ID válido obtenido de /api/equipos)
 *                 example: 1
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la reserva (YYYY-MM-DD)
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin de la reserva (YYYY-MM-DD)
 *               costo_total:
 *                 type: number
 *                 format: double
 *                 description: Costo total calculado de la reserva
 *             required:
 *               - usuario_id
 *               - equipo_id
 *               - fecha_inicio
 *               - fecha_fin
 *               - costo_total
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Equipo no encontrado o datos inválidos
 *       401:
 *         description: No autorizado
 */
// Crear reserva
router.post('/', verificarToken, reservaController.crearReserva);

/**
 * @swagger
 * /api/reservas/:
 *   get:
 *     summary: Listar todas las reservas (Admin)
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene todas las reservas del sistema. Endpoint para administradores.
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   usuarioId:
 *                     type: integer
 *                     example: 5
 *                   equipoId:
 *                     type: integer
 *                     example: 3
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-15"
 *                   fechaFin:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-20"
 *                   costoTotal:
 *                     type: number
 *                     format: float
 *                     example: 150.50
 *                   estado:
 *                     type: string
 *                     example: "Confirmada"
 *       500:
 *         description: Error al obtener reservas
 */
// Listar todas (Admin)
router.get('/', verificarToken,reservaController.listarReservasAdmin); 

/**
 * @swagger
 * /api/reservas/mis-reservas:
 *   get:
 *     summary: Listar mis reservas (Cliente autenticado)
 *     tags:
 *       - Reservas
 *     description: Obtiene todas las reservas del usuario autenticado. Requiere token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   equipoNombre:
 *                     type: string
 *                     example: "Laptop HP"
 *                   equipoImagen:
 *                     type: string
 *                     example: "laptop-hp.jpg"
 *                   fechaInicio:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-15"
 *                   fechaFin:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-20"
 *                   costoTotal:
 *                     type: number
 *                     format: float
 *                     example: 150.50
 *                   estado:
 *                     type: string
 *                     example: "Confirmada"
 *       401:
 *         description: Usuario no identificado o token inválido
 *       500:
 *         description: Error al obtener tus reservas
 */
// Listar MIS reservas (Requiere Token)
router.get('/mis-reservas', verificarToken, reservaController.listarMisReservas);

/**
 * @swagger
 * /api/reservas/{id}/estado:
 *   put:
 *     summary: Cambiar el estado de una reserva (Admin)
 *     tags:
 *       - Reservas
 *     description: Actualiza el estado de una reserva específica. Estados válidos - Pendiente, Confirmada, Finalizada, Cancelada
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [Pendiente, Confirmada, Finalizada, Cancelada]
 *                 description: Nuevo estado de la reserva
 *                 example: "Confirmada"
 *             required:
 *               - estado
 *     responses:
 *       200:
 *         description: Estado de la reserva actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva #1 actualizada a estado: Confirmada"
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 estado:
 *                   type: string
 *                   example: "Confirmada"
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno al actualizar reserva
 */
// PUT /api/reservas/:id/estado -> Cambiar estado (Admin)
router.put('/:id/estado', reservaController.cambiarEstadoReserva);

module.exports = router;