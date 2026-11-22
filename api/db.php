<?php
// api/db.php - Conexión a MySQL + sesión + funciones comunes

// Desactivar la salida de errores en pantalla para no romper el formato JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);
date_default_timezone_set('America/Lima');

// --- CONFIGURA AQUÍ TUS DATOS DE MYSQL ---
const DB_HOST = 'localhost';
const DB_PORT = '3306';
const DB_NAME = 'ferreteria_rio_santa'; 
const DB_USER = 'root';   
const DB_PASS = '';       
// -----------------------------------------

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'ok'      => false,
        'error'   => 'Error de conexión a la base de datos: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function out(array $data, int $code = 200)
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function body(): array
{
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);
    return is_array($data) ? $data : $_POST;
}

function user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function requireLogin(): void
{
    if (!user()) {
        out(['ok' => false, 'error' => 'Debes iniciar sesión.'], 401);
    }
}

function requireAdmin(): void
{
    requireLogin();
    $rol = user()['rol'] ?? '';
    if (!in_array($rol, ['administrador', 'desarrollador'], true)) {
        out(['ok' => false, 'error' => 'Acceso solo para administradores.'], 403);
    }
}

function isStaff(): bool
{
    $rol = strtolower((string)(user()['rol'] ?? ''));
    return in_array($rol, ['vendedor', 'administrador', 'desarrollador'], true);
}

function requireStaff(): void
{
    requireLogin();
    if (!isStaff()) {
        out(['ok' => false, 'error' => 'Acceso solo para el personal.'], 403);
    }
}
