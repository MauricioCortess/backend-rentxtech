// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'clave_super_secreta_de_rentxtech'; // Usa la misma clave secreta que en authController.js

function verificarToken(req, res, next) {
    // 1. Obtener el token del encabezado (Header)
    // El frontend lo enviará como: Authorization: Bearer [token_jwt]
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Si no hay token o el formato es incorrecto, negamos el acceso
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    // 2. Extraer el token (quitando "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. Adjuntar la información decodificada (ID y rol) a la solicitud (req)
        // Así, el controlador sabrá quién hizo la petición.
        req.usuarioId = decoded.id;
        req.usuarioRol = decoded.rol;
        
        // 5. Continuar al controlador
        next(); 
    } catch (err) {
        // Token inválido (expirado, modificado, etc.)
        return res.status(403).json({ error: 'Token inválido o expirado. Vuelve a iniciar sesión.' });
    }
}

module.exports = verificarToken;