// src/models/Categoria.js
const pool = require('../config/db');

const Categoria = {
    // Crear
    crear: async (nombre, descripcion) => {
        const query = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
        const [result] = await pool.execute(query, [nombre, descripcion]);
        return result;
    },

    // Listar
    listar: async () => {
        const query = 'SELECT * FROM categorias';
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Actualizar (PUT)
    actualizar: async (id, nombre, descripcion) => {
        const query = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?';
        const [result] = await pool.execute(query, [nombre, descripcion, id]);
        return result.affectedRows;
    },

    // Eliminar (DELETE)
    eliminar: async (id) => {
        const query = 'DELETE FROM categorias WHERE id = ?';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows;
    }
};

module.exports = Categoria;