// src/controllers/usuarioController.js
const Usuario = require('../models/Usuario');

// 1. Listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.listar();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// 2. Actualizar el rol de un usuario (PUT)
exports.actualizarRolUsuario = async (req, res) => {
    try {
        const { id } = req.params; // El ID viene en la URL (ej: /api/usuarios/5)
        const { rol } = req.body;  // El nuevo rol viene en el cuerpo (ej: { "rol": "admin" })

        // Validación básica
        if (!rol) {
            return res.status(400).json({ error: 'El campo rol es obligatorio.' });
        }

        const affectedRows = await Usuario.actualizarRol(id, rol);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado o no se realizaron cambios.' });
        }

        res.json({ mensaje: `Rol de usuario ${id} actualizado a ${rol}`, id });

    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar rol.' });
    }
};

// 3. Eliminar un usuario (DELETE)
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await Usuario.eliminar(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado con éxito', id });

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        // Nota: Si el usuario tiene reservas, la BD podría impedir borrarlo (por la FK)
        res.status(500).json({ error: 'No se pudo eliminar el usuario. Puede que tenga reservas activas.' });
    }
};