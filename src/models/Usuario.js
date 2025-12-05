// src/models/Usuario.js
const pool = require('../config/db');

const Usuario = {
    // 1. Crear un nuevo usuario
    crear: async (nombre, email, password_hash, rol = 'cliente') => {
        const query = 'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [nombre, email, password_hash, rol]);
        return result;
    },

    // 2. Buscar por email
    buscarPorEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await pool.execute(query, [email]); 
        return rows[0]; 
    },

    // 3. Buscar por ID
    buscarPorId: async (id) => {
        // Excluimos el password_hash para seguridad
        const query = 'SELECT id, nombre, email, rol, fecha_registro FROM usuarios WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }, // <--- ¡ESTA COMA ERA LA QUE FALTABA!

    // 4. Listar todos los usuarios
    listar: async () => {
        const query = 'SELECT id, nombre, email, rol, fecha_registro FROM usuarios';
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = Usuario;