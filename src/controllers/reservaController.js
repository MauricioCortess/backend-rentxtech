// src/controllers/reservaController.js
const Reserva = require('../models/Reserva');
const Equipo = require('../models/Equipo');

// --- CREAR RESERVA ---
exports.crearReserva = async (req, res) => {
    const { usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total } = req.body; 

    // (Mantenemos tu lógica de validación y stock que ya funcionaba)
    if (!usuario_id || !equipo_id || !fecha_inicio || !fecha_fin || !costo_total) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    try {
        const equipo = await Equipo.buscarPorId(equipo_id); 
        if (!equipo || equipo.stock <= 0) {
            return res.status(409).json({ error: 'Sin stock disponible.' });
        }
        
        const stockActualizado = await Equipo.restarStock(equipo_id, 1); 
        if (stockActualizado === 0) {
             return res.status(500).json({ error: 'Error de inventario.' });
        }

        const resultado = await Reserva.crear(usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total, 'Confirmada');

        res.status(201).json({
            mensaje: 'Reserva creada exitosamente',
            id: resultado.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al reservar.' });
    }
};

// --- LISTAR RESERVAS (ADMIN) ---
exports.listarReservasAdmin = async (req, res) => {
    try {
        const reservas = await Reserva.listar();
        
        // Formateo de datos para el frontend (convertir fechas si es necesario)
        const reservasFormateadas = reservas.map(r => ({
            ...r,
            // Aseguramos que los precios sean números
            costoTotal: parseFloat(r.costo_total),
            // Mapeamos los nombres raros de la BD a lo que usa el frontend si hace falta
            usuarioId: r.usuario_id,
            equipoId: r.equipo_id,
            fechaInicio: r.fecha_inicio, // Ojo: MySQL devuelve objeto Date, el front lo maneja
            fechaFin: r.fecha_fin
        }));

        res.json(reservasFormateadas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener reservas.' });
    }
};

// --- LISTAR MIS RESERVAS (CLIENTE) ---
exports.listarMisReservas = async (req, res) => {
    try {
        // Obtenemos el ID del usuario desde el Token (inyectado por authMiddleware)
        const usuarioId = req.usuarioId; 
        
        if (!usuarioId) {
             return res.status(401).json({ error: 'Usuario no identificado.' });
        }

        const reservas = await Reserva.listarPorUsuario(usuarioId);
        
        // Formateamos para que coincida con la interfaz del Frontend
        const reservasFrontend = reservas.map(r => ({
            id: r.id,
            equipoNombre: r.equipoNombre, // Viene del JOIN
            equipoImagen: r.equipoImagen, // Viene del JOIN
            fechaInicio: r.fecha_inicio.toISOString().split('T')[0], // Formato YYYY-MM-DD simple
            fechaFin: r.fecha_fin.toISOString().split('T')[0],
            costoTotal: parseFloat(r.costo_total),
            estado: r.estado
        }));

        res.json(reservasFrontend);

    } catch (error) {
        console.error('Error al listar mis reservas:', error);
        res.status(500).json({ error: 'Error al obtener tus reservas.' });
    }
};