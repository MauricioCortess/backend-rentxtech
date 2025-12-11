// src/models/Reserva.js
const pool = require('../config/db');

const Reserva = {
    // 1. Crear reserva
    crear: async (usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total, estado = 'Confirmada') => {
        const query = 'INSERT INTO reservas (usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total, estado) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total, estado]);
        return result;
    },

    // 2. Listar TODAS (Para Admin)
    listar: async () => {
        const query = `
            SELECT 
                r.id, r.fecha_inicio, r.fecha_fin, r.costo_total, r.estado,
                u.nombre AS usuarioNombre,
                u.email AS usuarioEmail,
                e.nombre AS equipoNombre,
                e.imagen_url AS equipoImagen
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.id
            JOIN equipos e ON r.equipo_id = e.id
            ORDER BY r.created_at DESC;
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },
    
    // 3. Listar POR USUARIO
    listarPorUsuario: async (usuario_id) => {
        const query = `
            SELECT 
                r.id, r.fecha_inicio, r.fecha_fin, r.costo_total, r.estado,
                e.nombre AS equipoNombre,
                e.imagen_url AS equipoImagen
            FROM reservas r
            JOIN equipos e ON r.equipo_id = e.id
            WHERE r.usuario_id = ?
            ORDER BY r.created_at DESC;
        `;
        const [rows] = await pool.execute(query, [usuario_id]);
        return rows;
    },

    // 4. Actualizar estado
    actualizarEstado: async (id, nuevoEstado) => {
        const query = 'UPDATE reservas SET estado = ? WHERE id = ?';
        const [result] = await pool.execute(query, [nuevoEstado, id]);
        return result.affectedRows; 
    },

    // 5. Esto se agrego eliminar Reserva
    eliminar: async (id) => {
        const query = 'DELETE FROM reservas WHERE id = ?';
        const [result] = await pool.execute(query, [id]);
        return result.affectedRows;
    }
};

module.exports = Reserva;