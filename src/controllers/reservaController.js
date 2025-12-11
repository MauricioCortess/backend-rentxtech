// src/controllers/reservaController.js
const Reserva = require('../models/Reserva');
const Equipo = require('../models/Equipo');

// --- CREAR RESERVA ---
exports.crearReserva = async (req, res) => {
    console.log('Datos recibidos para crear reserva:', req.body);
    const { usuario_id, equipo_id, fecha_inicio, fecha_fin, costo_total } = req.body; 
    
    // Validación básica
    if (!usuario_id || !equipo_id || !fecha_inicio || !fecha_fin || !costo_total) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    try {
        // 1. Validar Stock
        const equipo = await Equipo.buscarPorId(equipo_id); 
        if (!equipo || equipo.stock <= 0) {
            return res.status(409).json({ error: 'Sin stock disponible.' });
        }
        
        // 2. Restar Stock
        const stockActualizado = await Equipo.restarStock(equipo_id, 1);
        if (stockActualizado === 0) {
             return res.status(500).json({ error: 'Error de inventario. Intente de nuevo.' });
        }

        // 3. Crear Reserva (Estado inicial Confirmada)
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
    const usuarioRol = req.usuarioRol;

    if (usuarioRol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    try {
        const reservas = await Reserva.listar();
        
        // Formateo de datos
        const reservasFormateadas = reservas.map(r => ({
            ...r,
            costoTotal: parseFloat(r.costo_total),
            usuarioId: r.usuario_id,
            equipoId: r.equipo_id,
            // Aseguramos que las fechas sean strings simples YYYY-MM-DD
            fechaInicio: r.fecha_inicio instanceof Date ? r.fecha_inicio.toISOString().split('T')[0] : r.fecha_inicio,
            fechaFin: r.fecha_fin instanceof Date ? r.fecha_fin.toISOString().split('T')[0] : r.fecha_fin
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
        const usuarioId = req.usuarioId; 
        
        if (!usuarioId) {
             return res.status(401).json({ error: 'Usuario no identificado.' });
        }

        const reservas = await Reserva.listarPorUsuario(usuarioId);
        
        const reservasFrontend = reservas.map(r => ({
            id: r.id,
            equipoNombre: r.equipoNombre, 
            equipoImagen: r.equipoImagen,
            fechaInicio: r.fecha_inicio instanceof Date ? r.fecha_inicio.toISOString().split('T')[0] : r.fecha_inicio,
            fechaFin: r.fecha_fin instanceof Date ? r.fecha_fin.toISOString().split('T')[0] : r.fecha_fin,
            costoTotal: parseFloat(r.costo_total),
            estado: r.estado
        }));

        res.json(reservasFrontend);

    } catch (error) {
        console.error('Error al listar mis reservas:', error);
        res.status(500).json({ error: 'Error al obtener tus reservas.' });
    }
};

// --- CAMBIAR ESTADO RESERVA (PUT) ---
exports.cambiarEstadoReserva = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; 

    // Validación simple de estados (Soporta Mayúsculas y minúsculas para robustez)
    const estadosValidos = ['Pendiente', 'Confirmada', 'Finalizada', 'Cancelada', 'pendiente', 'confirmada', 'finalizada', 'cancelada'];
    
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado no válido.' });
    }

    try {
        const affectedRows = await Reserva.actualizarEstado(id, estado);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada.' });
        }

        res.json({ mensaje: `Reserva #${id} actualizada a estado: ${estado}`, id, estado });

    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ error: 'Error interno al actualizar reserva.' });
    }
};

// --- ELIMINAR RESERVA (DELETE) --- (NUEVO)
exports.eliminarReserva = async (req, res) => {
    // Verificar rol Admin
    if (req.usuarioRol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Solo admins pueden eliminar reservas.' });
    }

    try {
        const { id } = req.params;
        const eliminados = await Reserva.eliminar(id);

        if (eliminados === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json({ mensaje: 'Reserva eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar:', error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};