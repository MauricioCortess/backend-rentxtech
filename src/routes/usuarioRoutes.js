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
 *         description: Lista de usuarios recuperada exitosamente (Admin)
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
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario (Admin)
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Carlos Garcia"
 *               email:
 *                 type: string
 *                 example: "carlos@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "miContraseña123"
 *               rol:
 *                 type: string
 *                 enum: [cliente, admin, editor]
 *                 example: "cliente"
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario creado con éxito"
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *       '400':
 *         description: Campos obligatorios faltantes
 *       '500':
 *         description: Error del servidor
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/editUser:
 *   put:
 *     summary: Editar un usuario por correo electrónico
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez Actualizado"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "nuevaContraseña123"
 *               rol:
 *                 type: string
 *                 enum: [cliente, admin, editor]
 *                 example: "admin"
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Usuario actualizado con éxito"
 *       '400':
 *         description: Email es obligatorio
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error del servidor
 */
router.put('/editUser', usuarioController.editarUsuarioPorEmail);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar el rol de un usuario (Admin)
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
 *     summary: Eliminar un usuario permanentemente (Admin)
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