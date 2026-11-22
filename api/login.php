<?php
require 'db.php';
$m = $_SERVER['REQUEST_METHOD'];

// Manejar peticiones GET (Verificar sesión actual o cerrar sesión)
if ($m === 'GET') {
    if (isset($_GET['salir']) && $_GET['salir'] == '1') {
        session_destroy();
        out(['ok' => true, 'mensaje' => 'Sesión cerrada correctamente']);
    }

    $u = user();
    if ($u) {
        out(['ok' => true, 'usuario' => $u]);
    } else {
        out(['ok' => false, 'error' => 'No hay sesión activa'], 401);
    }
}

// Manejar peticiones POST (Inicio de sesión)
if ($m === 'POST') {
    $b = body();
    $identificador = trim($b['usuario'] ?? '');
    $password = (string)($b['password'] ?? '');

    if (empty($identificador) || empty($password)) {
        out(['ok' => false, 'error' => 'Por favor, completa todos los campos'], 400);
    }

    // Usamos LEFT JOIN por si la tabla roles llega a tener algún desajuste
    $st = $pdo->prepare('
        SELECT u.id, u.nombre, u.correo, u.password, u.rol_id, r.nombre AS rol 
        FROM usuarios u 
        LEFT JOIN roles r ON u.rol_id = r.id 
        WHERE u.nombre = ? OR u.correo = ?
    ');
    $st->execute([$identificador, $identificador]);
    $usuarioBD = $st->fetch(PDO::FETCH_ASSOC);

    // Validación flexible: acepta texto plano ('1234') o contraseña hasheada
    $passwordValida = false;
    if ($usuarioBD) {
        $hashBD = $usuarioBD['password'];
        if ($password === $hashBD || password_verify($password, $hashBD)) {
            $passwordValida = true;
        }
    }

    if (!$usuarioBD || !$passwordValida) {
        out(['ok' => false, 'error' => 'Usuario o contraseña incorrectos'], 401);
    }

    $nombreRol = $usuarioBD['rol'] ?? ($usuarioBD['rol_id'] == 2 ? 'administrador' : 'vendedor');

    if (!in_array(strtolower($nombreRol), ['vendedor', 'administrador', 'desarrollador'], true)) {
        out(['ok' => false, 'error' => 'Esta cuenta no tiene acceso. El ingreso es solo para el personal.'], 403);
    }

    $_SESSION['user'] = [
        'id' => (int)$usuarioBD['id'],
        'nombre' => $usuarioBD['nombre'],
        'correo' => $usuarioBD['correo'],
        'rol' => $nombreRol,
        'rol_id' => (int)$usuarioBD['rol_id']
    ];

    out([
        'ok' => true,
        'mensaje' => 'Inicio de sesión exitoso',
        'usuario' => $_SESSION['user']
    ]);
}

out(['ok' => false, 'error' => 'Método no permitido'], 405);