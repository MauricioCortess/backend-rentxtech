// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// --- DOCUMENTACIÓN SWAGGER (YAML) ---

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios del sistema (Panel Admin)
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista de todos los usuarios
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios recuperada exitosamente
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
 *                   nombre:
 *                     type: string
 *                     example: "Juan Perez"
 *                   email:
 *                     type: string
 *                     example: "juan@example.com"
 *                   rol:
 *                     type: string
 *                     example: "cliente"
 *       '500':
 *         description: Error del servidor
 */
router.get('/', usuarioController.listarUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar el rol de un usuario
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rol
 *             properties:
 *               rol:
 *                 type: string
 *                 enum: [cliente, admin, editor]
 *                 description: Nuevo rol para el usuario
 *                 example: "admin"
 *     responses:
 *       '200':
 *         description: Rol actualizado correctamente
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.put('/:id', usuarioController.actualizarRolUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario permanentemente
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       '200':
 *         description: Usuario eliminado correctamente
 *       '404':
 *         description: Usuario no encontrado
 *       '409':
 *         description: No se puede eliminar (tiene reservas activas)
 *       '500':
 *         description: Error del servidor
 */
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;