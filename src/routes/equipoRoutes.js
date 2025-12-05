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

// Rutas
router.post('/', upload.single('imagen'), equipoController.crearEquipo);
router.get('/', equipoController.listarEquipos);
router.get('/:id', equipoController.obtenerDetalleEquipo);
router.put('/:id', upload.single('imagen'), equipoController.actualizarEquipo);
router.delete('/:id', equipoController.eliminarEquipo);

module.exports = router;