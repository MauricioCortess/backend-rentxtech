// src/models/Usuario.js
const pool = require('../config/db');

const Usuario = {
    // Crear un nuevo usuario (Para registro)
    crear: async (nombre, email, password_hash, rol = 'cliente') => {
        const query = 'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [nombre, email, password_hash, rol]);
        return result;
    },

    // Buscar por email (Para el login)
    buscarPorEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0]; // Retorna el primer usuario encontrado o undefined
    },

    // Buscar por ID (Útil para obtener perfil)
    buscarPorId: async (id) => {
        const query = 'SELECT id, nombre, email, rol, fecha_registro FROM usuarios WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }
};

module.exports = Usuario;