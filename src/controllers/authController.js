// src/controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CLAVE SECRETA: En un proyecto real esto va en el archivo .env, pero por ahora lo pondremos aquí.
const JWT_SECRET = 'clave_super_secreta_de_rentxtech'; 

// --- LOGIN ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario
        const usuario = await Usuario.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // 2. Comparar contraseñas
        // (Nota: Si usaste los usuarios "semilla" del script SQL, la contraseña es 'secret_temp_pass' sin encriptar.
        // Esta lógica soporta ambas: encriptada o texto plano para pruebas rápidas).
        const esCorrecta = await bcrypt.compare(password, usuario.password_hash) || password === usuario.password_hash;

        if (!esCorrecta) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // 3. Generar Token (El "Gafete")
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        // 4. Responder (Sin mandar el password)
        res.json({
            mensaje: 'Autenticación exitosa',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// --- REGISTRO (Crear cuenta) ---
exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificar si ya existe
        const existe = await Usuario.buscarPorEmail(email);
        if (existe) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // 2. Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 3. Guardar en BD
        const resultado = await Usuario.crear(nombre, email, password_hash);

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: resultado.insertId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// --- PERFIL DE USUARIO (USANDO TOKEN) ---
// Este endpoint es usado por el frontend al cargar la página para reconstruir la sesión.
exports.obtenerPerfil = async (req, res) => {
    try {
        // El authMiddleware ya verificó el token y añadió req.usuarioId
        const usuarioId = req.usuarioId;
        
        // Buscamos el perfil completo (sin el hash)
        const usuario = await Usuario.buscarPorId(usuarioId); 

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Respondemos con los datos necesarios para reconstruir la sesión
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ error: 'Error interno al procesar el perfil.' });
    }
};