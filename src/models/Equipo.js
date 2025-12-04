// src/models/Equipo.js
const pool = require('../config/db');

const Equipo = {
    // Función para crear un nuevo equipo
    crear: async (categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs) => {
        const query = 'INSERT INTO equipos (categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs]);
        return result;
    },

    // Función para obtener todos los equipos (para el Catálogo)
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
    },

    // --- NUEVAS FUNCIONES PARA EL MÓDULO DE RESERVAS ---

    // Función para buscar un equipo por su ID (para Detalles y Validación)
    // MEJORA: Agregamos el JOIN para traer también el nombre de la categoría
    buscarPorId: async (id) => {
        const query = `
            SELECT 
                e.*, 
                c.nombre AS categoria_nombre
            FROM equipos e
            JOIN categorias c ON e.categoria_id = c.id
            WHERE e.id = ?
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    // Función CRÍTICA: Restar stock de forma segura
    restarStock: async (id, cantidad = 1) => {
        console.log(`---- INTENTANDO RESTAR STOCK ----`);
        console.log(`ID Equipo: ${id}`);
        console.log(`Cantidad a restar: ${cantidad}`);

        const query = 'UPDATE equipos SET stock = stock - ? WHERE id = ? AND stock >= ?';
        const [result] = await pool.execute(query, [cantidad, id, cantidad]);
        
        console.log(`Resultado MySQL (affectedRows): ${result.affectedRows}`);
        console.log(`----------------------------------`);
        
        return result.affectedRows; 
    }
};

module.exports = Equipo;