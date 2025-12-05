-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2025 a las 23:23:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rentxtech_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Workstation', NULL),
(2, 'Laptop Gamer', NULL),
(3, 'Servidor', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_por_dia` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `imagen_url` varchar(255) DEFAULT NULL,
  `specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specs`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `categoria_id`, `nombre`, `descripcion`, `precio_por_dia`, `stock`, `imagen_url`, `specs`) VALUES
(1, 1, 'Workstation Pro Z-Series', NULL, 120.00, 3, NULL, '[\"Ryzen 9\", \"64GB RAM\", \"RTX 4090\"]'),
(2, 2, 'Laptop Gamer MSI Raider', NULL, 85.50, 2, NULL, '[\"i7 13th Gen\", \"32GB RAM\", \"RTX 4070\"]'),
(3, 1, 'Computadora PRIDE GAMING PC SITA V2', 'Ideal para juegos ligeros/streaming.', 300.00, 11, 'http://localhost:3000/uploads/1764953377155.png', '[\"AMD RYZEN 5 9600X\",\"NVIDIA GeForce RTX 5060\",\"32GB RAM\",\"1TB M.2\"]'),
(4, 1, 'Computadora PRIDE GAMING CALIPSO V2', 'Disfruta de este equipo multitarea, ideal para ecición/juegos', 500.00, 9, 'http://localhost:3000/uploads/1764944484167.png', '[\"Ryzen 7 9700X\",\"NVIDIA RTX 5080\",\"32GB RAM\",\"5TB SSD\"]'),
(5, 1, 'Computadora ULTIMATE PC WARDEN', 'Ideal para gaming/streaming y renders ligeros.', 400.00, 10, 'http://localhost:3000/uploads/1764954143625.png', '[\"AMD Ryzen 7 5700x\",\"32GB RAM\",\"1TB M.2\",\"RTX 5060 8GB\"]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `equipo_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `costo_total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','confirmada','finalizada','cancelada') NOT NULL DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `usuario_id`, `equipo_id`, `fecha_inicio`, `fecha_fin`, `costo_total`, `estado`, `created_at`) VALUES
(1, 6, 1, '2025-12-04', '2025-12-05', 120.00, 'cancelada', '2025-12-04 22:07:50'),
(2, 6, 1, '2025-12-05', '2025-12-06', 120.00, 'cancelada', '2025-12-04 23:23:21'),
(3, 6, 4, '2025-12-08', '2025-12-09', 500.00, 'cancelada', '2025-12-05 14:57:40'),
(4, 2, 3, '2025-12-05', '2025-12-06', 300.00, 'cancelada', '2025-12-05 16:50:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` enum('cliente','admin') NOT NULL DEFAULT 'cliente',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password_hash`, `rol`, `fecha_registro`) VALUES
(1, 'Admin Principal', 'admin@rentxtech.com', 'secret_temp_pass', 'admin', '2025-11-27 01:41:54'),
(2, 'Cliente Prueba', 'cliente@test.com', 'secret_temp_pass', 'cliente', '2025-11-27 01:41:54'),
(4, 'Mi Nuevo Tester', 'tester@rentx.com', '$2b$10$tIzY3Ml33oOBQusoOPXhuORcQ0pb.F1tGfhq/SQ.zNqGMCaJyYeDS', 'cliente', '2025-12-04 00:53:03'),
(5, 'Otro Test', 'otro@test.com', '$2b$10$QcPD0FGyyeL0Pp0xfGUtTOOLk5Bevbqy/RBtphrwSLBZfQa6Sa1hu', 'cliente', '2025-12-04 01:04:44'),
(6, 'Mauricio Cortes', 'maucortes2001@gmail.com', '$2b$10$r8BJ4N3ZlBnif1YKRNKBU.r21qc3O2QC0AqqBGwGdLEXnfH2OoaEm', 'cliente', '2025-12-04 01:05:34'),
(7, 'tester2', 'tester2@gmail.com', '$2b$10$mXmTneHH1GgxXFTJcCR31udA3l6CzP2oXmVeDcePJPhnXL8x/mL6m', 'cliente', '2025-12-04 01:12:04'),
(8, 'nuevocliente', 'nuevo@cliente.com', '$2b$10$HvGjVOQc4eMVHfI8SM8pneCxkPtemW1cJaCTr45JFuDrM7.4Yy9HS', 'cliente', '2025-12-04 01:51:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `equipo_id` (`equipo_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
