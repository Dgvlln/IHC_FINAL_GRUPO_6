<?php
// api/products.php
require_once 'db.php';

$m = $_SERVER['REQUEST_METHOD'];

if ($m === 'GET') {
    try {
        // Seleccionamos toda la tabla para evitar errores por nombres de columnas específicas
        $stmt = $pdo->query('SELECT * FROM productos ORDER BY id');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Adaptamos los campos de forma segura para el frontend
        $formatted = [];
        foreach ($rows as $r) {
            $formatted[] = [
                'id'    => (int)($r['id'] ?? 0),
                'nombre'=> $r['nombre'] ?? ($r['titulo'] ?? 'Producto'),
                'categoria' => $r['categoria'] ?? 'General',
                'precio'    => (float)($r['precio'] ?? $r['precio_venta'] ?? 0),
                'antes'     => isset($r['precio_anterior']) ? (float)$r['precio_anterior'] : null,
                'stock'     => (int)($r['stock'] ?? 0),
                'base'      => (int)($r['stock_base'] ?? $r['stock'] ?? 0),
                'sub'       => $r['subcategoria'] ?? ''
            ];
        }
        
        out(['ok' => true, 'productos' => $formatted]);
    } catch (PDOException $e) {
        out(['ok' => false, 'error' => 'Error en consulta: ' . $e->getMessage()], 500);
    }
}

requireAdmin();
$b = body();

if ($m === 'PUT') {
    $id = (int)($b['id'] ?? 0);
    $stock = max(0, (int)($b['stock'] ?? 0));
    $pdo->prepare('UPDATE productos SET stock = ? WHERE id = ?')->execute([$stock, $id]);
    out(['ok' => true]);
}

if ($m === 'POST' && ($b['action'] ?? '') === 'reset') {
    // Intenta resetear usando stock_base si existe, o lo deja igual
    try {
        $pdo->exec('UPDATE productos SET stock = stock_base');
    } catch (Exception $ex) {
        // Ignora si no existe stock_base
    }
    out(['ok' => true]);
}

out(['ok' => false, 'error' => 'Acción no válida'], 400);