// src/controllers/equipoController.js
const Equipo = require('../models/Equipo');

exports.crearEquipo = async (req, res) => {
    try {
        // Obtenemos todos los campos necesarios del cuerpo de la petición
        const { categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specs } = req.body;

        // Validación esencial (puedes añadir más)
        if (!nombre || !categoria_id || !precio_por_dia || stock === undefined || stock === null) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, categoria_id, precio_por_dia, y stock.' });
        }

        // Convertimos el objeto specs a string JSON para guardarlo en la columna JSON de MySQL
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
        
        // El modelo devuelve 'categoria_nombre' y 'specs' como texto. 
        // Lo transformamos a un formato más limpio para el frontend (JSON parseado).
        const equiposFormateados = equipos.map(equipo => ({
            ...equipo,
            // Reemplazamos el ID por el nombre de la categoría para el frontend
            categoria: equipo.categoria_nombre, 
            // Parseamos el string JSON de specs de vuelta a un objeto JavaScript
            specs: JSON.parse(equipo.specs) 
        }));

        res.json(equiposFormateados);
    } catch (error) {
        console.error('Error al listar equipos:', error);
        res.status(500).json({ error: 'Error al obtener la lista de equipos' });
    }
};