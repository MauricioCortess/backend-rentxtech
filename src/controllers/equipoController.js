const Equipo = require('../models/Equipo');

// 1. CREAR EQUIPO
exports.crearEquipo = async (req, res) => {
    try {
        const { categoria_id, nombre, descripcion, precio_por_dia, stock, specs } = req.body;
        
        // Si hay archivo, construimos la URL
        const imagen_url = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

        // Parseamos specs si viene como string
        let specsJson = '[]';
        if (specs) {
             try { 
                 const parsed = typeof specs === 'string' ? JSON.parse(specs) : specs;
                 specsJson = JSON.stringify(parsed);
             } catch(e) { 
                 specsJson = JSON.stringify([specs]); 
             }
        }

        const resultado = await Equipo.crear(categoria_id, nombre, descripcion, precio_por_dia, stock, imagen_url, specsJson);

        res.status(201).json({ mensaje: 'Equipo creado', id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear equipo' });
    }
};

// 2. LISTAR EQUIPOS
exports.listarEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.listar();
        const equiposFormateados = equipos.map(equipo => ({
            id: equipo.id,
            nombre: equipo.nombre,
            descripcion: equipo.descripcion,
            precioPorDia: parseFloat(equipo.precio_por_dia), 
            stock: equipo.stock,
            imagenUrl: equipo.imagen_url,
            categoria: equipo.categoria_nombre, 
            specs: equipo.specs ? JSON.parse(equipo.specs) : []
        }));
        res.json(equiposFormateados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar equipos' });
    }
};

// 3. DETALLE DE EQUIPO
exports.obtenerDetalleEquipo = async (req, res) => {
    try {
        const equipoId = req.params.id;
        const equipo = await Equipo.buscarPorId(equipoId);

        if (!equipo) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        const equipoFormateado = {
            id: equipo.id,
            nombre: equipo.nombre,
            categoria: equipo.categoria_nombre, 
            precioPorDia: parseFloat(equipo.precio_por_dia),
            stock: equipo.stock,
            imagenUrl: equipo.imagen_url,
            specs: equipo.specs ? JSON.parse(equipo.specs) : [],
            descripcion: equipo.descripcion,
        };

        res.json(equipoFormateado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalle' });
    }
};

// 4. ACTUALIZAR EQUIPO
exports.actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria_id, precio_por_dia, stock, specs, descripcion } = req.body;
        // console.log("Specs recibidas:", specs);
        // console.log("Tipo de specs:", typeof specs);
        // Mejor manejo de specs
        let specsJson = '[]';
        if (specs) {
            try {
                if (typeof specs === 'string') {
                    // Intenta parsear como JSON
                    specsJson = JSON.stringify(JSON.parse(specs));
                } else if (typeof specs === 'object') {
                    // Si ya es un objeto
                    specsJson = JSON.stringify(specs);
                } else {
                    // Si es texto plano, envuélvelo en un array
                    specsJson = JSON.stringify([specs]);
                }
            } catch(e) {
                // Si no es JSON válido, envuélvelo como string en un array
                console.error("Error al parsear specs:", e);
                specsJson = JSON.stringify([specs]);
            }
        }

        const imagen_url = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : req.body.imagen_url;

        const datos = { nombre, categoria_id, precio_por_dia, stock, imagen_url, specs: specsJson, descripcion };

        const affectedRows = await Equipo.actualizar(id, datos);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado.' });
        }

        res.json({ mensaje: 'Equipo actualizado con éxito', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar equipo' });
    }
};

// 5. ELIMINAR EQUIPO
exports.eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Equipo.eliminar(id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado.' });
        }
        res.json({ mensaje: 'Equipo eliminado con éxito', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar equipo (posiblemente tiene reservas).' });
    }
};