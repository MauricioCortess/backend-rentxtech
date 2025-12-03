// src/controllers/categoriaController.js
const Categoria = require('../models/Categoria');

exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body; // Recibe datos del POST

        // Validación básica
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' });
        }
        // Llamar al modelo para crear la categoría
        const resultado = await Categoria.crear(nombre, descripcion);

        res.status(201).json({ // Código 201: Creado con éxito
            mensaje: 'Categoría creada con éxito',
            id: resultado.insertId,
            nombre
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        // Código 500: Error interno del servidor
        res.status(500).json({ error: 'Error al crear la categoría. (Verificar si ya existe el nombre)' });
    }
};

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.listar();
        res.json(categorias); // Devuelve el array de objetos
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};