// src/controllers/equipoController.js
const Equipo = require('../models/Equipo');
const { parse } = require('dotenv');

exports.crearEquipo = async (req, res) => {
    try {
        const { categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs } = req.body;

        if (!nombre || !categoria_id || !precio_por_dia || stock === undefined || stock === null) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, categoria_id, precio_por_dia, y stock.' });
        }

        const specsJson = JSON.stringify(specs || []);

        const resultado = await Equipo.crear(categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specsJson);

        res.status(201).json({
            mensaje: 'Equipo creado con éxito',
            id: resultado.insertId
        });

    } catch (error) {
        console.error('Error al crear equipo:', error);
        res.status(500).json({ error: 'Error al crear el equipo. Asegúrese que la categoria_id exista.' });
    }
};

exports.listarEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.listar();
        
        // --- ARREGLO DE PRECIO Y FORMATO PARA EL CATÁLOGO ---
        const equiposFormateados = equipos.map(equipo => ({
            id: equipo.id,
            nombre: equipo.nombre,
            descripcion: equipo.descripcion,
            // Convertimos precio_por_dia (snake_case) a precioPorDia (camelCase)
            precioPorDia: parseFloat(equipo.precio_por_dia), 
            stock: equipo.stock,
            imagenUrl: equipo.imagen_url,
            // La categoría ya viene con el JOIN
            categoria: equipo.categoria_nombre, 
            specs: JSON.parse(equipo.specs) 
        }));
        // ----------------------------------------------------

        res.json(equiposFormateados);
    } catch (error) {
        console.error('Error al listar equipos:', error);
        res.status(500).json({ error: 'Error al obtener la lista de equipos' });
    }
};

// Endpoint para obtener detalles de un solo equipo (usado por la página de detalles)
exports.obtenerDetalleEquipo = async (req, res) => {
    try {
        const equipoId = req.params.id;
        const equipo = await Equipo.buscarPorId(equipoId);

        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        // --- ARREGLO DE PRECIO Y FORMATO PARA EL DETALLE ---
        const equipoFormateado = {
            id: equipo.id,
            nombre: equipo.nombre,
            categoria: equipo.categoria_nombre, 
            precioPorDia: parseFloat(equipo.precio_por_dia), // CONVERSIÓN A NÚMERO Y CAMELCASE
            stock: equipo.stock,
            imagenUrl: equipo.imagen_url,
            specs: JSON.parse(equipo.specs),
            descripcion: equipo.descripcion,
        };
        // ----------------------------------------------------

        res.json(equipoFormateado);

    } catch (error) {
        console.error('Error al obtener detalle de equipo:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener detalles.' });
    }
};