<?php
session_start();
include("bd.php");

// Verificar sesión
if (!isset($_SESSION['usuario'])) {
    header("Location: ../login.php");
    exit();
}

// Solo admin o superadmin pueden anular
$rol = $_SESSION['usuario']['rol'] ?? '';
if ($rol !== 'admin' && $rol !== 'superadmin') {
    echo "<script>
        alert('No tienes permisos para anular órdenes');
        window.location.href='../ordenes.php';
    </script>";
    exit();
}

// Verificar que exista id
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: ../ordenes.php");
    exit();
}

$idOrden = intval($_GET['id']);

// Capturar motivo y comentarios (si vienen por GET o POST, sino poner por defecto)
$motivo = $_GET['motivo'] ?? 'Por revisar';
$comentarios = $_GET['comentarios'] ?? '';

// 1️⃣ Actualizar estado en la tabla ordenes
$stmt = mysqli_prepare($conexionBd, "UPDATE ordenes SET estado = 'Anulada' WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $idOrden);
mysqli_stmt_execute($stmt);

// 2️⃣ Insertar en tabla ordenes_anuladas
$stmt2 = mysqli_prepare($conexionBd, "
    INSERT INTO ordenes_anuladas (numero_orden, motivo, comentarios, usuario_anulo)
    SELECT numero_orden, ?, ?, ? FROM ordenes WHERE id = ?
");
$usuario = $_SESSION['usuario']['nombre'];
mysqli_stmt_bind_param($stmt2, "sssi", $motivo, $comentarios, $usuario, $idOrden);
mysqli_stmt_execute($stmt2);

// Redirigir a ordenes.php
header("Location: ../ordenes.php");
exit();
?>