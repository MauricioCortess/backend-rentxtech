// src/models/Categoria.js
const pool = require('../config/db');

const Categoria = {
    // Función para crear una nueva categoría
    crear: async (nombre, descripcion) => {
        const query = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
        // Ejecutamos la consulta y pasamos los datos
        const [result] = await pool.execute(query, [nombre, descripcion]);
        return result;
    },

    // Función para obtener todas las categorías
    listar: async () => {
        const query = 'SELECT * FROM categorias';
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = Categoria;