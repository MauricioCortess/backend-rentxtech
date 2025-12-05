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

// 2. Actualizar el rol de un usuario
exports.actualizarRolUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol } = req.body; // Esperamos recibir { "rol": "admin" }

        if (!rol) {
            return res.status(400).json({ error: 'El campo rol es obligatorio.' });
        }

        const affectedRows = await Usuario.actualizarRol(id, rol);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado o rol no modificado.' });
        }

        res.json({ mensaje: 'Rol actualizado con éxito', id });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// 3. Eliminar un usuario
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
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};