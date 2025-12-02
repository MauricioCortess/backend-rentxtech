# RentxTech - Backend API

API RESTful para la plataforma de renta de equipos de cómputo. Construida con Node.js, Express y MySQL.

## 🛠️ Requisitos Previos

* **Node.js** (Versión LTS recomendada)
* **MySQL Server** (XAMPP, MAMP o MySQL Community)

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el servidor localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DEL_REPO]
    cd backend-rentxtech
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    * Crea un archivo llamado `.env` en la raíz del proyecto.
    * Copia el siguiente contenido y ajusta `DB_PASSWORD` según tu configuración local:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=       # Tu contraseña de MySQL (vacío en XAMPP por defecto)
    DB_NAME=rentxtech_db
    DB_PORT=3306
    ```

4.  **Base de Datos:**
    * Asegúrate de que tu servicio MySQL esté corriendo.
    * Ejecuta el script SQL proporcionado en la documentación para crear la base de datos `rentxtech_db`.

5.  **Iniciar el Servidor:**
    ```bash
    npm run dev
    ```

## ✅ Verificación

Si todo funciona correctamente, deberías ver en la terminal:
```text
🚀 Servidor Express corriendo en http://localhost:3000
✅ Conexión exitosa a la Base de Datos MySQL (rentxtech_db)