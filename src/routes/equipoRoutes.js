const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

// --- CONFIGURACIÓN DE MULTER ---
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
});
const upload = multer({ storage: storage });
// -------------------------------

/**
 * @swagger
 * /api/equipos/:
 *   post:
 *     summary: Crear un nuevo equipo
 *     tags:
 *       - Equipos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoria_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio_por_dia:
 *                 type: string
 *               stock:
 *                 type: integer
 *               specs:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *             required:
 *               - categoria_id
 *               - nombre
 *               - descripcion
 *               - precio_por_dia
 *               - stock
 *     responses:
 *       201:
 *         description: Equipo creado exitosamente
 */
router.post('/', upload.single('imagen'), equipoController.crearEquipo);

/**
 * @swagger
 * /api/equipos/:
 *   get:
 *     summary: Listar todos los equipos
 *     tags:
 *       - Equipos
 *     responses:
 *       200:
 *         description: Lista de equipos
 */
router.get('/', equipoController.listarEquipos);

/**
 * @swagger
 * /api/equipos/{id}:
 *   get:
 *     summary: Obtener detalle de un equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del equipo
 *       404:
 *         description: Equipo no encontrado
 */
router.get('/:id', equipoController.obtenerDetalleEquipo);

/**
 * @swagger
 * /api/equipos/{id}:
 *   put:
 *     summary: Actualizar un equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               categoria_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio_por_dia:
 *                 type: string
 *               stock:
 *                 type: integer
 *               specs:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *             required:
 *               - categoria_id
 *               - nombre
 *               - descripcion
 *               - precio_por_dia
 *               - stock
 *     responses:
 *       200:
 *         description: Equipo actualizado
 *       404:
 *         description: Equipo no encontrado
 */
router.put('/:id', upload.single('imagen'), equipoController.actualizarEquipo);

/**
 * @swagger
 * /api/equipos/{id}:
 *   delete:
 *     summary: Eliminar un equipo
 *     tags:
 *       - Equipos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo eliminado
 *       404:
 *         description: Equipo no encontrado
 */
router.delete('/:id', equipoController.eliminarEquipo);

module.exports = router;