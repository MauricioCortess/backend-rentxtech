// src/config/db.js
const mysql = require('mysql2');
// Cargar las variables del archivo .env
require('dotenv').config();

// Crear un pool de conexiones (es más eficiente que abrir/cerrar una por una)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Máximo 10 conexiones simultáneas
    queueLimit: 0
});

// Convertir el pool para poder usar async/await (Promesas) en el futuro
const promisePool = pool.promise();

// Probar la conexión inmediatamente
promisePool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la Base de Datos MySQL (rentxtech_db)');
        connection.release(); // Liberar la conexión de prueba
    })
    .catch(error => {
        console.error('❌ ERROR FATAL: No se pudo conectar a la Base de Datos.');
        console.error('Detalle:', error.message);
        console.error('Revisa tu archivo .env y que MySQL esté corriendo.');
        // Si no hay BD, matamos el proceso porque el servidor no sirve
        process.exit(1);
    });

// Exportamos el pool para usarlo en los modelos
module.exports = promisePool;