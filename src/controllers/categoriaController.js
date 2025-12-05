// src/controllers/categoriaController.js
const Categoria = require('../models/Categoria');

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) return res.status(400).json({ error: 'Nombre obligatorio' });

        const resultado = await Categoria.crear(nombre, descripcion);
        res.status(201).json({ mensaje: 'Categoría creada', id: resultado.insertId, nombre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear categoría' });
    }
};

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.listar();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar categorías' });
    }
};

// Actualizar
exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        
        const affected = await Categoria.actualizar(id, nombre, descripcion);
        
        if(affected === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        
        res.json({ mensaje: 'Categoría actualizada', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar categoría' });
    }
};

// Eliminar
exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const affected = await Categoria.eliminar(id);
        
        if(affected === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
        
        res.json({ mensaje: 'Categoría eliminada', id });
    } catch (error) {
        console.error(error);
        // Error común: No se puede borrar si hay equipos asociados (FK Constraint)
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({ error: 'No se puede eliminar: Hay equipos en esta categoría.' });
        }
        res.status(500).json({ error: 'Error al eliminar categoría' });
    }
};