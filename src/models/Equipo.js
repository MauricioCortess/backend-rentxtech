// src/models/Equipo.js
const pool = require('../config/db');

const Equipo = {
    // Función para crear un nuevo equipo
    crear: async (categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs) => {
        const query = 'INSERT INTO equipos (categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs]);
        return result;
    },

    // Función para obtener todos los equipos, incluyendo el nombre de la categoría
    // Nota: Usamos JOIN para traer el nombre de la tabla 'categorias'
    listar: async () => {
        const query = `
            SELECT 
                e.id, e.nombre, e.descripcion, e.precio_por_dia, e.stock, e.imagen_url, e.specs,
                c.nombre AS categoria_nombre, 
                c.id AS categoria_id
            FROM equipos e
            JOIN categorias c ON e.categoria_id = c.id;
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
};

module.exports = Equipo;