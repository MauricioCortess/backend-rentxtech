const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

// --- CONFIGURACIÓN DE MULTER (Subida de imágenes) ---
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Carpeta donde se guardarán
    },
    filename: function (req, file, cb) {
        // Nombre único: fecha + nombre original
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
});
const upload = multer({ storage: storage });
// ----------------------------------------------------

// POST: Usamos 'upload.single' para procesar la imagen que viene en el campo 'imagen'
router.post('/', upload.single('imagen'), equipoController.crearEquipo);

router.get('/', equipoController.listarEquipos);
router.get('/:id', equipoController.obtenerDetalleEquipo);

module.exports = router;