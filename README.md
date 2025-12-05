# 🚀 RentxTech - Plataforma de Renta de Cómputo (Full-Stack)

# Descripción del Proyecto:

RentxTech es una plataforma web Full-Stack diseñada para la gestión transaccional y renta de equipos de cómputo de alto rendimiento. El objetivo del proyecto fue integrar un frontend interactivo desarrollado en la Unidad 3 (Vue.js) con un backend funcional y seguro, cumpliendo con la arquitectura N-Capas.

El sistema final gestiona el inventario, permite la autenticación segura, y maneja el ciclo de vida de las reservas (desde la creación con descuento de stock hasta la actualización de estado por el administrador).

# Arquitectura y Tecnologías Utilizadas:

- Frontend
TECNOLOGÍA: Vue.js 3, Vite, Pinia, Tailwind CSS
Proposito: Maquetado, experiencia de usuario, y manejo del estado global (Autenticación y Catálogo).

- Backend
TECNOLOGÍA: Node.js + Express.js
Proposito: API RESTful que maneja la lógica de negocio y las transacciones. Estructura de N-Capas.

- Base de Datos
TECNOLOGÍA: MySQL
Proposito: Motor relacional utilizado para asegurar la integridad de Reservas e Inventario.

- Seguridad
TECNOLOGÍA: JWT (jsonwebtoken) y bcryptjs
Proposito: Autenticación y protección de rutas.

- Sitema de Archivos tipo Imagenes
TECNOLOGÍA: Multer
Proposito: Manejo de subida de imágenes para el inventario de equipos.

# Diagrama de Flujo del Backend (N-Capas)

El sistema está organizado en capas para una clara separación de responsabilidades:

1. src/routes: Define la URL (/api/equipos, /api/reservas).

2. src/controllers: Recibe la petición HTTP, realiza validaciones básicas y orquesta la llamada a la lógica de negocio (Servicios/Modelos).

3. src/models: Ejecuta las consultas directas a MySQL (SELECT, UPDATE, DELETE) para la persistencia.

4. src/middlewares: Ejecuta la lógica de seguridad (ej. verificarToken) antes de que la petición llegue al controlador.

# Diseño de Base de Datos

El proyecto se basa en un esquema relacional con cuatro tablas principales, diseñado para manejar la transaccionalidad del inventario y las reservas.

- Tabla usuarios (id, nombre, email (UNIQUE), password_hash, rol) 
Tipo de Relación: Relación 1:N con reservas.

- Tabla categorias (id, nombre (UNIQUE)) 
Tipo de Relación: Relación 1:N con equipos.

- Tabla equipos (id, categoria_id (FK), stock (CRÍTICO), precio_por_dia, specs (JSON), imagen_url) 
Tipo de Relación: Relación 1:N con reservas.

- Tabla reservas (id, usuario_id (FK), equipo_id (FK), fecha_inicio, costo_total, estado) 
Tipo de Relación: Conecta usuarios y equipos. Es la tabla transaccional.

# API Endpoints y Contratos (CRUD Completo)

Todos los endpoints listados han sido implementados y conectados al Frontend.

Módulo de Autenticación y Usuarios (Full CRUD)
----------------------------------------------------------------------------------------------------------------------------------
- Método: POST
Endpoint: /api/auth/register
Crea un nuevo usuario con contraseña encriptada (bcrypt).
Formulario de Registro.

- Método: POST
Endpoint: /api/auth/login
Inicia sesión y devuelve un token JWT (para persistencia).
Formulario de Login.

- Método: GET
Endpoint: /api/auth/profile
Devuelve los datos del usuario logueado (Usado por el Frontend para persistencia).
REQUIERE JWT

- Método: GET
Endpoint: /api/usuarios
Lista todos los usuarios (Panel Admin).
Carga la tabla de Usuarios.

- Método: PUT
Endpoint: /api/usuarios/:id
Actualiza el rol de un usuario.
Botón Editar Rol.

- Método: DELETE
Endpoint: /api/usuarios/:id
Elimina un usuario.
Botón Eliminar en la tabla de Usuarios.

Módulo de Inventario (Equipos)
----------------------------------------------------------------------------------------------------------------------------------
- Método: GET
Endpoint: /api/equipos
Lista el catálogo y usa JOIN para obtener nombre de categoría.
Catálogo Público y Panel Admin (Lectura).

- Método: POST
Endpoint: /api/equipos
Crea un equipo.
Modal + Añadir Equipo. Maneja multipart/form-data para imágenes.

- Método: PUT
Endpoint: /api/equipos/:id
Actualiza stock, precio y datos del equipo.
Modal Editar Equipo.

- Método: DELETE
Endpoint: /api/equipos/:id
Elimina un equipo.
Botón Eliminar en la tabla de Equipos.

Módulo de Categorías (Organización del Inventario)
----------------------------------------------------------------------------------------------------------------------------------
- Método: POST
Endpoint: /api/categorias
Crea una categoría nueva.
Modal + Nueva Categoría.

- Método: GET
Endpoint: /api/categorias
Lista todas las categorías.
Carga los Selectores de Equipos y la tabla de Gestión de Categorías.

- Método: PUT
Endpoint: /api/categorias/:id
Actualiza el nombre y/o descripción de una categoría.
Modal Editar Categoría.

- Método: DELETE
Endpoint: /api/categorias/:id
Elimina una categoría.
Botón Eliminar (Falla si hay equipos asociados).

Módulo de Reservas (Transacciones)
----------------------------------------------------------------------------------------------------------------------------------
- Método: POST
Endpoint: /api/reservas
Crea una nueva reserva (usado en la vista de detalle).
Verifica Stock y llama a Equipo.restarStock antes de guardar.

- Método: GET
Endpoint: /api/reservas
Lista todas las reservas (Panel Admin).
Carga la tabla de Gestión de Reservas.

- Método: GET
Endpoint: /api/reservas/mis-reservas
Obtiene historial del usuario logueado.
Pestaña Mis Reservas en el perfil.

- Método: PUT
Endpoint: /api/reservas/:id/estado
Cambia el estado (Confirmar, Cancelar, Finalizar).
Botones de Acciones en la tabla de Reservas.

# Instalación y Ejecución Local
1. Clonar Repositorios:
git clone URL_DEL_REPO
2. Navegar a la carpeta del frontend y backend
cd "NOMBRE_DE_CARPETA"
3. Instalación de dependencias dentro de cada carpeta (frontend y backend):
npm install
4. Crear archivo .env y configurar dentro de la raíz del backend:
Asegurarse de establecer la configuración correcta de la Base de Datos del dispositivo:
Texto dentro del archivo .env:
// Configuración de TU Servidor (Express)
PORT=3000
// Configuración de la Base de Datos (MySQL)		 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=    // Si usas XAMPP, déjalo vacío. Si pusiste contraseña, escríbela aquí sin comillas.
DB_NAME=rentxtech_db
DB_PORT=3306    //AQUI SE PONE EL PUERTO DE MYSQL QUE SALGA EN XAMPP CON EL QUE ENTRA A PHPMYADMIN //.
5. Asegurarse que la Base de Datos (rentxtech_db) exista y contenga la estructura definida.
Servidor MySQL Activo (ejemplo:XAMPP).
6. Iniciar Servidores (Frontend y Backend):
Terminal 1 en carpeta del Backend:
npm run dev
Terminal 2 en carpeta del Frontend:
npm run dev
7. Usar las credenciales de prueba de la Base de Datos para acceder como Administrador al Panel de Administración y empezar a probar el sistema.







