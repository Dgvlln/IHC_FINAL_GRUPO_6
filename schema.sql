CREATE DATABASE IF NOT EXISTS ferreteria_rio_santa
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ferreteria_rio_santa;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL DEFAULT 1,
    estado TINYINT(1) NOT NULL DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    subcategoria VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0,
    precio_anterior DECIMAL(10,2) NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_base INT NOT NULL DEFAULT 0,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comprobante VARCHAR(20) NOT NULL UNIQUE,
    tipo_comprobante ENUM('boleta','factura') NOT NULL DEFAULT 'boleta',
    correlativo INT NOT NULL,
    metodo_pago ENUM('efectivo','yape','plin','tarjeta') NOT NULL DEFAULT 'efectivo',
    cliente_doc VARCHAR(15) NULL,
    cliente_nombre VARCHAR(150) NULL,
    cliente_direccion VARCHAR(200) NULL,
    usuario_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tipo_correlativo (tipo_comprobante, correlativo),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_venta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL DEFAULT '',
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    importe DECIMAL(10,2) AS (cantidad * precio) STORED,
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB;

INSERT IGNORE INTO roles (id, nombre) VALUES
(1, 'cliente'),
(2, 'administrador'),
(3, 'desarrollador'),
(4, 'vendedor');

-- Usuarios del personal (administrador y vendedor)
INSERT IGNORE INTO usuarios (nombre, correo, password, rol_id) VALUES
('admin', 'admin@riosanta.com', '$2y$12$E3Jh0mNLK94dkBb6/nH5QeQhpdHWwm8rNt3BinDSbXnFRUUe/kqgm', 2),
('vendedor', 'vendedor@riosanta.com', '$2y$12$ag44aQ4kSCWyRU1Lfx0pk.QB0.dPysHJJ0ChTxdZdG.mVjHpmKSIu', 4);

-- Catálogo de productos con su stock inicial
INSERT IGNORE INTO productos (id,nombre,categoria,subcategoria,precio,precio_anterior,stock,stock_base) VALUES
(1,'Cemento Sol x 42.5kg','Construcción','Cemento y Concreto',28.5,NULL,150,150),
(4,'Cemento Andino Tipo I x 42.5kg','Construcción','Cemento y Concreto',27.8,NULL,120,120),
(5,'Yeso en Bolsa 20kg','Construcción','Cemento y Concreto',14,NULL,40,40),
(2,'Fierro Corrugado 1/2" Aceros Arequipa','Construcción','Fierro y Alambre',34,NULL,80,80),
(6,'Fierro Corrugado 3/8" Aceros Arequipa','Construcción','Fierro y Alambre',22,NULL,100,100),
(7,'Fierro Corrugado 5/8" Aceros Arequipa','Construcción','Fierro y Alambre',52,NULL,60,60),
(8,'Alambre Negro N°16 por kg','Construcción','Fierro y Alambre',6.5,NULL,200,200),
(9,'Alambre Galvanizado N°14 por kg','Construcción','Fierro y Alambre',8.5,NULL,90,90),
(10,'Alambre de Púas Rollo 200m','Construcción','Fierro y Alambre',130,NULL,15,15),
(11,'Clavos de 2" por kg','Construcción','Clavos y Fijaciones',5.5,NULL,300,300),
(12,'Clavos de 3" por kg','Construcción','Clavos y Fijaciones',5.5,NULL,250,250),
(15,'Clavos para Calamina por kg','Construcción','Clavos y Fijaciones',8,NULL,80,80),
(16,'Tornillos Drywall 1" Caja x100','Construcción','Clavos y Fijaciones',12,NULL,70,70),
(3,'Ladrillo King Kong 18H','Construcción','Ladrillos y Bloques',1.2,NULL,1200,1200),
(18,'Ladrillo Pandereta','Construcción','Ladrillos y Bloques',0.9,NULL,1500,1500),
(19,'Ladrillo de Techo 15cm','Construcción','Ladrillos y Bloques',2.4,NULL,800,800),
(38,'Bloque de Concreto 15cm','Construcción','Ladrillos y Bloques',3.2,NULL,400,400),
(39,'Tabla de Construcción 2"x8"x3m','Construcción','Tablas y Madera',38,NULL,60,60),
(40,'Tabla de Encofrado 1"x8"x3m','Construcción','Tablas y Madera',22,NULL,90,90),
(41,'Listón de Madera 2"x2"x3m','Construcción','Tablas y Madera',12,NULL,120,120),
(42,'Triplay Fenólico 18mm 1.22x2.44m','Construcción','Tablas y Madera',165,180,25,25),
(43,'Parante de Eucalipto 3m','Construcción','Tablas y Madera',14,NULL,100,100),
(44,'Arena Gruesa por m³','Construcción','Arena y Piedra',65,NULL,30,30),
(45,'Piedra Chancada 1/2" por m³','Construcción','Arena y Piedra',85,NULL,25,25),
(46,'Tanque Rotoplas 600L','Tanques y Agua','Tanques Rotoplas',380,NULL,12,12),
(47,'Tanque Rotoplas 1100L','Tanques y Agua','Tanques Rotoplas',560,610,10,10),
(48,'Tanque Rotoplas 2500L','Tanques y Agua','Tanques Rotoplas',1150,NULL,4,4),
(49,'Cisterna Rotoplas 1000L','Tanques y Agua','Tanques Rotoplas',780,NULL,6,6),
(50,'Tubo PVC Agua 1/2" x 5m','Tanques y Agua','Tuberías PVC',12,NULL,80,80),
(51,'Tubo PVC Desagüe 4" x 3m','Tanques y Agua','Tuberías PVC',28,NULL,60,60),
(52,'Codo PVC 1/2"','Tanques y Agua','Accesorios de Agua',1.5,NULL,300,300),
(53,'Llave de Paso 1/2" Bronce','Tanques y Agua','Accesorios de Agua',24,NULL,50,50),
(54,'Pegamento PVC 1/4 Galón','Tanques y Agua','Accesorios de Agua',32,NULL,35,35),
(55,'Flotador de Tanque 1/2"','Tanques y Agua','Accesorios de Agua',18,NULL,40,40),
(20,'Inodoro One Piece Trébol con Sistema Dual','Baños y Sanitarios','Inodoros',380,NULL,15,15),
(25,'Pack Combo Inodoro + Lavatorio + Espejo','Baños y Sanitarios','Inodoros',450,520,10,10),
(21,'Lavatorio de Loza con Pedestal Blanco','Baños y Sanitarios','Lavatorios',125,NULL,20,20),
(22,'Grifería Monocomando para Lavatorio Cromo','Baños y Sanitarios','Grifería',95,115,25,25),
(23,'Ducha Térmica Electric Shower 4 Temp','Baños y Sanitarios','Duchas y Tinas',140,NULL,30,30),
(24,'Tina de Baño Acrílica 1.40m Blanca','Baños y Sanitarios','Duchas y Tinas',650,NULL,5,5),
(26,'Espejo Redondo con Luz LED Touch 60cm','Espejos y Decoración','Espejos',180,210,12,12),
(27,'Espejo Rectangular con Marco de Aluminio','Espejos y Decoración','Espejos',150,NULL,18,18),
(28,'Espejo Organizador de Pared para Joyas/Baño','Espejos y Decoración','Espejos',220,NULL,8,8),
(29,'Mueble Base para Lavatorio Melamine','Muebles y Estantería','Muebles de Baño',290,NULL,10,10),
(30,'Estante Metálico Modular 5 Niveles','Muebles y Estantería','Estantes',165,190,22,22),
(31,'Gabinete Aéreo de Cocina Melamine 1.20m','Muebles y Estantería','Cocina y Oficina',340,NULL,7,7),
(32,'Escritorio de Oficina Minimalista en L','Muebles y Estantería','Cocina y Oficina',280,NULL,14,14),
(33,'Foco LED Ahorrador 12W Luz Blanca Philips','Iluminación y Focos','Focos LED',9.5,NULL,150,150),
(34,'Foco LED Dicroico GU10 7W Luz Cálida','Iluminación y Focos','Focos LED',12,NULL,90,90),
(35,'Panel LED Redondo Empotrable 18W','Iluminación y Focos','Paneles y Reflectores',28,35,60,60),
(36,'Reflector LED Exterior 50W IP66','Iluminación y Focos','Paneles y Reflectores',55,NULL,25,25),
(37,'Tira LED 5 Metros RGB con Control Remoto','Iluminación y Focos','Tiras LED',38,NULL,40,40),
(13,'Martillo de Carpintero Profesional','Herramientas','Manuales',25,NULL,18,18),
(14,'Juego de Llaves Mixtas x 8pz','Herramientas','Manuales',55,NULL,12,12),
(56,'Alicate Universal 8"','Herramientas','Manuales',22,NULL,35,35),
(57,'Taladro Percutor 750W','Herramientas','Eléctricas',210,NULL,9,9),
(58,'Amoladora 4 1/2" 850W','Herramientas','Eléctricas',185,NULL,12,12),
(59,'Wincha de 5 metros','Herramientas','Medición',12,NULL,50,50),
(60,'Nivel de Burbuja 60cm','Herramientas','Medición',28,NULL,25,25),
(62,'Cable THW 2.5mm² Rollo 100m','Electricidad','Cables',210,NULL,14,14),
(63,'Cable Vulcanizado 2x14 por metro','Electricidad','Cables',4.5,NULL,400,400),
(64,'Interruptor Simple Bticino','Electricidad','Interruptores y Tomas',9,NULL,80,80),
(65,'Tomacorriente Doble con Tierra','Electricidad','Interruptores y Tomas',14,NULL,70,70),
(66,'Pintura Látex Blanco 4L','Pinturas','Látex y Esmaltes',78,NULL,30,30),
(67,'Esmalte Sintético 1 Galón','Pinturas','Látex y Esmaltes',95,NULL,20,20),
(68,'Rodillo 9" con Bandeja','Pinturas','Accesorios de Pintura',18,NULL,40,40),
(69,'Brocha de 3"','Pinturas','Accesorios de Pintura',8,NULL,60,60),
(70,'Casco de Seguridad Amarillo','Seguridad','Protección Personal',18,NULL,50,50),
(71,'Guantes de Cuero por par','Seguridad','Protección Personal',12,NULL,80,80),
(72,'Lentes de Seguridad','Seguridad','Protección Personal',8,NULL,90,90),
(73,'Botas de Seguridad Punta de Acero','Seguridad','Protección Personal',95,NULL,20,20);
