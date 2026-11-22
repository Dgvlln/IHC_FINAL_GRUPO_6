<?php
require 'db.php';

// Solo el personal (vendedor / administrador) registra ventas en el mostrador.
requireStaff();
$u = user();
$b = body();
$items = $b['items'] ?? [];

if (empty($items) || !is_array($items)) {
    out(['ok' => false, 'error' => 'El carrito está vacío'], 400);
}

// --- Comprobante, cliente y método de pago ---
$tipo   = strtolower((string)($b['tipo'] ?? 'boleta'));
$metodo = strtolower((string)($b['metodo'] ?? ''));
$cli    = is_array($b['cliente'] ?? null) ? $b['cliente'] : [];
$cortar = function ($s, $n) {
    return function_exists('mb_substr') ? mb_substr($s, 0, $n) : substr($s, 0, $n);
};
$cliDoc = trim((string)($cli['doc'] ?? ''));
$cliNom = $cortar(trim((string)($cli['nombre'] ?? '')), 150);
$cliDir = $cortar(trim((string)($cli['direccion'] ?? '')), 200);

if (!in_array($tipo, ['boleta', 'factura'], true)) {
    out(['ok' => false, 'error' => 'Tipo de comprobante no válido'], 400);
}
if (!in_array($metodo, ['efectivo', 'yape', 'plin', 'tarjeta'], true)) {
    out(['ok' => false, 'error' => 'Selecciona un método de pago válido'], 400);
}
if ($tipo === 'factura') {
    if (!preg_match('/^(10|15|16|17|20)\d{9}$/', $cliDoc)) {
        out(['ok' => false, 'error' => 'El RUC debe tener 11 dígitos'], 400);
    }
    if ($cliNom === '') {
        out(['ok' => false, 'error' => 'Falta la razón social del cliente'], 400);
    }
} elseif ($cliDoc !== '' && !preg_match('/^\d{8}$/', $cliDoc)) {
    out(['ok' => false, 'error' => 'El DNI debe tener 8 dígitos'], 400);
}

try {
    $pdo->beginTransaction();

    // Unir líneas repetidas del mismo producto
    $lineas = [];
    foreach ($items as $item) {
        $id = (int)($item['id'] ?? 0);
        $cantidad = (int)($item['cantidad'] ?? 0);
        if ($id <= 0 || $cantidad <= 0) continue;

        if (isset($lineas[$id])) {
            $lineas[$id]['cantidad'] += $cantidad;
        } else {
            $lineas[$id] = ['id' => $id, 'cantidad' => $cantidad];
        }
    }

    if (empty($lineas)) {
        throw new Exception('El carrito está vacío');
    }

    $stBuscar = $pdo->prepare('SELECT id, nombre, precio, stock FROM productos WHERE id = ? FOR UPDATE');

    $subtotalGeneral = 0;
    $detalleVentaBD = [];

    foreach ($lineas as $linea) {
        $id = $linea['id'];
        $cantidad = $linea['cantidad'];

        $stBuscar->execute([$id]);
        $prod = $stBuscar->fetch(PDO::FETCH_ASSOC);

        // El servidor NUNCA crea productos: si no existe, se rechaza la compra
        if (!$prod) {
            throw new Exception("El producto con ID $id no existe en la base de datos.");
        }

        if ((int)$prod['stock'] < $cantidad) {
            throw new Exception('Stock insuficiente para: ' . $prod['nombre'] . ' (Disponible: ' . $prod['stock'] . ')');
        }

        // El precio siempre sale de la base de datos
        $precioUnitario = (float)$prod['precio'];
        $subtotalGeneral += $precioUnitario * $cantidad;

        $detalleVentaBD[] = [
            'id'       => (int)$prod['id'],
            'nombre'   => $prod['nombre'],
            'precio'   => $precioUnitario,
            'cantidad' => $cantidad
        ];
    }

    $unidadesTotales = array_sum(array_column($detalleVentaBD, 'cantidad'));
    $descuento = ($unidadesTotales >= 10)
        ? ($subtotalGeneral * 0.10)
        : (($unidadesTotales >= 5) ? ($subtotalGeneral * 0.05) : 0);
    $totalGeneral = $subtotalGeneral - $descuento;

    $fechaActual = date('Y-m-d H:i:s');
    $usuarioId = $u['id'] ?? 1;

    // Serie y correlativo propios de cada tipo de comprobante (B001 / F001)
    $serie = ($tipo === 'factura') ? 'F001' : 'B001';
    $stCorr = $pdo->prepare('SELECT COALESCE(MAX(correlativo), 0) + 1 FROM ventas WHERE tipo_comprobante = ?');
    $stCorr->execute([$tipo]);
    $correlativo = (int)$stCorr->fetchColumn();
    $numComprobante = $serie . '-' . str_pad((string)$correlativo, 6, '0', STR_PAD_LEFT);

    $stVenta = $pdo->prepare(
        'INSERT INTO ventas (comprobante, tipo_comprobante, correlativo, metodo_pago, cliente_doc, cliente_nombre, cliente_direccion, usuario_id, subtotal, descuento, total, fecha)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stVenta->execute([
        $numComprobante, $tipo, $correlativo, $metodo,
        ($cliDoc !== '' ? $cliDoc : null), ($cliNom !== '' ? $cliNom : null), ($cliDir !== '' ? $cliDir : null),
        $usuarioId, $subtotalGeneral, $descuento, $totalGeneral, $fechaActual
    ]);
    $ventaId = (int)$pdo->lastInsertId();

    // Detectar columna de precio en detalle_venta
    $colPrecio = 'precio_unitario';
    $checkCol = $pdo->query("SHOW COLUMNS FROM detalle_venta LIKE 'precio'");
    if ($checkCol && $checkCol->rowCount() > 0) {
        $colPrecio = 'precio';
    }

    $stDetalle = $pdo->prepare("INSERT INTO detalle_venta (venta_id, producto_id, cantidad, {$colPrecio}) VALUES (?, ?, ?, ?)");
    $stStock = $pdo->prepare('UPDATE productos SET stock = stock - ? WHERE id = ?');

    foreach ($detalleVentaBD as $det) {
        $stDetalle->execute([$ventaId, $det['id'], $det['cantidad'], $det['precio']]);
        $stStock->execute([$det['cantidad'], $det['id']]);
    }

    $pdo->commit();

    out([
        'ok'       => true,
        'mensaje'  => 'Compra registrada con éxito',
        'venta_id' => $ventaId,
        'total'    => $totalGeneral,
        'venta'    => [
            'numero'    => $numComprobante,
            'tipo'      => $tipo,
            'metodo'    => $metodo,
            'cliente'   => ['doc' => $cliDoc, 'nombre' => $cliNom, 'direccion' => $cliDir],
            'fecha'     => date('d/m/Y H:i'),
            'items'     => $detalleVentaBD,
            'subtotal'  => $subtotalGeneral,
            'descuento' => $descuento,
            'total'     => $totalGeneral
        ]
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    if ($e instanceof PDOException && $e->getCode() == '23000') {
        out(['ok' => false, 'error' => 'Se registró otra venta al mismo tiempo. Intenta de nuevo.'], 400);
    }
    out(['ok' => false, 'error' => $e->getMessage()], 400);
}