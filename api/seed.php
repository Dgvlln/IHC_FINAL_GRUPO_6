<?php
require 'db.php';

// Solo se puede ejecutar en tu propia computadora (localhost) o por consola.
if (PHP_SAPI !== 'cli' && !in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) {
    out(['ok' => false, 'error' => 'seed.php solo se ejecuta en localhost.'], 403);
}

const CO='Construcción', AG='Tanques y Agua', BA='Baños y Sanitarios', ES='Espejos y Decoración', MU='Muebles y Estantería',
      IL='Iluminación y Focos', HE='Herramientas', EL='Electricidad', PI='Pinturas', SE='Seguridad';

$TREE = [
 CO=>['🧱',['Cemento y Concreto','Fierro y Alambre','Clavos y Fijaciones','Ladrillos y Bloques','Tablas y Madera','Arena y Piedra']],
 AG=>['💧',['Tanques Rotoplas','Tuberías PVC','Accesorios de Agua']],
 BA=>['🚽',['Inodoros','Lavatorios','Grifería','Duchas y Tinas']],
 ES=>['🪞',['Espejos']],
 MU=>['🛋️',['Muebles de Baño','Estantes','Cocina y Oficina']],
 IL=>['💡',['Focos LED','Paneles y Reflectores','Tiras LED']],
 HE=>['🛠️',['Manuales','Eléctricas','Medición']],
 EL=>['🔌',['Cables','Interruptores y Tomas']],
 PI=>['🎨',['Látex y Esmaltes','Accesorios de Pintura']],
 SE=>['🦺',['Protección Personal']],
];

// [id, nombre, categoría, nº subcategoría, precio, stock, precio anterior (opcional)]
$rows = [
[1,'Cemento Sol x 42.5kg',CO,0,28.5,150],
[4,'Cemento Andino Tipo I x 42.5kg',CO,0,27.8,120],
[5,'Yeso en Bolsa 20kg',CO,0,14,40],
[2,'Fierro Corrugado 1/2" Aceros Arequipa',CO,1,34,80],
[6,'Fierro Corrugado 3/8" Aceros Arequipa',CO,1,22,100],
[7,'Fierro Corrugado 5/8" Aceros Arequipa',CO,1,52,60],
[8,'Alambre Negro N°16 por kg',CO,1,6.5,200],
[9,'Alambre Galvanizado N°14 por kg',CO,1,8.5,90],
[10,'Alambre de Púas Rollo 200m',CO,1,130,15],
[11,'Clavos de 2" por kg',CO,2,5.5,300],
[12,'Clavos de 3" por kg',CO,2,5.5,250],
[15,'Clavos para Calamina por kg',CO,2,8,80],
[16,'Tornillos Drywall 1" Caja x100',CO,2,12,70],
[3,'Ladrillo King Kong 18H',CO,3,1.2,1200],
[18,'Ladrillo Pandereta',CO,3,.9,1500],
[19,'Ladrillo de Techo 15cm',CO,3,2.4,800],
[38,'Bloque de Concreto 15cm',CO,3,3.2,400],
[39,'Tabla de Construcción 2"x8"x3m',CO,4,38,60],
[40,'Tabla de Encofrado 1"x8"x3m',CO,4,22,90],
[41,'Listón de Madera 2"x2"x3m',CO,4,12,120],
[42,'Triplay Fenólico 18mm 1.22x2.44m',CO,4,165,25,180],
[43,'Parante de Eucalipto 3m',CO,4,14,100],
[44,'Arena Gruesa por m³',CO,5,65,30],
[45,'Piedra Chancada 1/2" por m³',CO,5,85,25],
[46,'Tanque Rotoplas 600L',AG,0,380,12],
[47,'Tanque Rotoplas 1100L',AG,0,560,10,610],
[48,'Tanque Rotoplas 2500L',AG,0,1150,4],
[49,'Cisterna Rotoplas 1000L',AG,0,780,6],
[50,'Tubo PVC Agua 1/2" x 5m',AG,1,12,80],
[51,'Tubo PVC Desagüe 4" x 3m',AG,1,28,60],
[52,'Codo PVC 1/2"',AG,2,1.5,300],
[53,'Llave de Paso 1/2" Bronce',AG,2,24,50],
[54,'Pegamento PVC 1/4 Galón',AG,2,32,35],
[55,'Flotador de Tanque 1/2"',AG,2,18,40],
[20,'Inodoro One Piece Trébol con Sistema Dual',BA,0,380,15],
[25,'Pack Combo Inodoro + Lavatorio + Espejo',BA,0,450,10,520],
[21,'Lavatorio de Loza con Pedestal Blanco',BA,1,125,20],
[22,'Grifería Monocomando para Lavatorio Cromo',BA,2,95,25,115],
[23,'Ducha Térmica Electric Shower 4 Temp',BA,3,140,30],
[24,'Tina de Baño Acrílica 1.40m Blanca',BA,3,650,5],
[26,'Espejo Redondo con Luz LED Touch 60cm',ES,0,180,12,210],
[27,'Espejo Rectangular con Marco de Aluminio',ES,0,150,18],
[28,'Espejo Organizador de Pared para Joyas/Baño',ES,0,220,8],
[29,'Mueble Base para Lavatorio Melamine',MU,0,290,10],
[30,'Estante Metálico Modular 5 Niveles',MU,1,165,22,190],
[31,'Gabinete Aéreo de Cocina Melamine 1.20m',MU,2,340,7],
[32,'Escritorio de Oficina Minimalista en L',MU,2,280,14],
[33,'Foco LED Ahorrador 12W Luz Blanca Philips',IL,0,9.5,150],
[34,'Foco LED Dicroico GU10 7W Luz Cálida',IL,0,12,90],
[35,'Panel LED Redondo Empotrable 18W',IL,1,28,60,35],
[36,'Reflector LED Exterior 50W IP66',IL,1,55,25],
[37,'Tira LED 5 Metros RGB con Control Remoto',IL,2,38,40],
[13,'Martillo de Carpintero Profesional',HE,0,25,18],
[14,'Juego de Llaves Mixtas x 8pz',HE,0,55,12],
[56,'Alicate Universal 8"',HE,0,22,35],
[57,'Taladro Percutor 750W',HE,1,210,9],
[58,'Amoladora 4 1/2" 850W',HE,1,185,12],
[59,'Wincha de 5 metros',HE,2,12,50],
[60,'Nivel de Burbuja 60cm',HE,2,28,25],
[62,'Cable THW 2.5mm² Rollo 100m',EL,0,210,14],
[63,'Cable Vulcanizado 2x14 por metro',EL,0,4.5,400],
[64,'Interruptor Simple Bticino',EL,1,9,80],
[65,'Tomacorriente Doble con Tierra',EL,1,14,70],
[66,'Pintura Látex Blanco 4L',PI,0,78,30],
[67,'Esmalte Sintético 1 Galón',PI,0,95,20],
[68,'Rodillo 9" con Bandeja',PI,1,18,40],
[69,'Brocha de 3"',PI,1,8,60],
[70,'Casco de Seguridad Amarillo',SE,0,18,50],
[71,'Guantes de Cuero por par',SE,0,12,80],
[72,'Lentes de Seguridad',SE,0,8,90],
[73,'Botas de Seguridad Punta de Acero',SE,0,95,20],
];

// SOLO tabla productos: si el id ya existe, corrige nombre, categoría, subcategoría y precios.
// NO modifica el stock actual ni stock_base.
$st = $pdo->prepare(
  'INSERT INTO productos (id,nombre,categoria,subcategoria,precio,precio_anterior,stock,stock_base)
   VALUES (?,?,?,?,?,?,?,?)
   ON DUPLICATE KEY UPDATE
     nombre=VALUES(nombre),
     categoria=VALUES(categoria),
     subcategoria=VALUES(subcategoria),
     precio=VALUES(precio),
     precio_anterior=VALUES(precio_anterior)'
);
foreach ($rows as $r) {
    $antes = $r[6] ?? null;
    $st->execute([$r[0], $r[1], $r[2], $TREE[$r[2]][1][$r[3]], $r[4], $antes, $r[5], $r[5]]);
}

out(['ok' => true, 'productos_actualizados' => count($rows)]);