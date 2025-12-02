// src/controllers/categoriaController.js
const Categoria = require('../models/Categoria');

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Validación básica
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        }

        // Llamamos al modelo
        const resultado = await Categoria.crear(nombre, descripcion);

        res.status(201).json({
            mensaje: 'Categoría creada con éxito',
            id: resultado.insertId,
            nombre
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.listar();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};