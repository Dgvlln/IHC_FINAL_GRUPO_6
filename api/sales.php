<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');

require 'db.php';
requireAdmin();

if (!function_exists('out')) {
    function out($data, $status = 200) {
        http_response_code($status);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$m = $_SERVER['REQUEST_METHOD'];

if ($m === 'GET') {
    try {
        // Consulta uniendo la tabla productos para obtener el nombre correctamente
        $stmt = $pdo->query(
            "SELECT v.comprobante AS n,
                    DATE_FORMAT(v.fecha, '%d/%m/%Y %H:%i:%s') AS fecha,
                    v.total,
                    COALESCE(u.nombre, '-') AS vendedor,
                    v.metodo_pago AS metodo,
                    COALESCE(NULLIF(v.cliente_nombre, ''), '-') AS cliente,
                    GROUP_CONCAT(CONCAT(d.cantidad, 'x ', p.nombre) SEPARATOR ', ') AS items
             FROM ventas v
             LEFT JOIN detalle_venta d ON d.venta_id = v.id
             LEFT JOIN productos p ON p.id = d.producto_id
             LEFT JOIN usuarios u ON u.id = v.usuario_id
             GROUP BY v.id, v.comprobante, v.fecha, v.total, v.metodo_pago, v.cliente_nombre, u.nombre
             ORDER BY v.id DESC"
        );
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($rows as &$r) {
            $r['total'] = (float)$r['total'];
        }
        unset($r);

        out(['ok' => true, 'ventas' => $rows]);
    } catch (Exception $e) {
        out(['ok' => false, 'error' => $e->getMessage()], 500);
    }
}

if ($m === 'DELETE') {
    try {
        $pdo->exec('DELETE FROM detalle_venta');
        $pdo->exec('DELETE FROM ventas');
        out(['ok' => true]);
    } catch (Exception $e) {
        out(['ok' => false, 'error' => $e->getMessage()], 500);
    }
}

out(['ok' => false, 'error' => 'Método no permitido'], 405);