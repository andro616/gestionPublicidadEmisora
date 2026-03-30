<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}

include("funciones/bd.php");

// Traer todas las órdenes anuladas
$ordenesAnuladas = mysqli_query($conexionBd, "
    SELECT o.numero_orden, o.nombre_cliente, a.motivo, a.comentarios, a.fecha_anulacion
    FROM ordenes_anuladas a
    JOIN ordenes o ON o.numero_orden = a.numero_orden
    ORDER BY a.fecha_anulacion DESC
");
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/avif" href="../img/logo.avif">
    <link rel="stylesheet" href="../css/styleAnuladas.css">
    <title>Celestial Stereo 104.1 FM — Órdenes Anuladas</title>
</head>

<body>
<header>
    <div class="topbar-brand">
        🎙 Celestial <span>104.1 FM</span>
    </div>

    <nav>
        <ul>
            <li><a href="index.php">DASHBOARD</a></li>
            <li><a href="clientes.php">CLIENTES</a></li>
            <li><a href="ordenes.php">ÓRDENES</a></li>
            <li><a href="anuladas.php" class="active-link">ANULADAS</a></li>
            <li><a href="confirmacion.php">CONFIRMACIÓN</a></li>
            <li><a href="administracion.php">ADMINISTRACIÓN</a></li>
        </ul>
    </nav>

    <div class="header-actions">
        <div class="admin-status is-active">
            <span class="status-dot"></span>
            <span><?= $_SESSION['usuario']['nombre'] ?></span>
        </div>
        <div class="boton-salir">
            <button><a href="funciones/logout.php">Salir</a></button>
        </div>
    </div>
</header>

<section class="text-prin">
    <div class="dashboard-container">
        <div class="titulo-boton">
            <h1>Anuladas</h1>
            <p>Gestión de órdenes de publicidad anuladas</p>
        </div>
    </div>
</section>

<main class="page-grid">
    <div class="main-card">
        <div class="tabs-container">
            <button class="tab-link active" id="tab-lista">LISTA DE ANULADAS</button>
            <button class="tab-link" id="tab-gestion">GESTIONAR ANULACIÓN</button>
        </div>

        <hr class="tab-separator">

        <!-- LISTA DE ANULADAS -->
        <section id="section-lista" class="tab-content active">
            <div class="search-bar">
                <input type="text" placeholder="Buscar por ID o cliente..." id="input-busqueda">
                <button type="button" class="btn-buscar">BUSCAR</button>
            </div>

            <table class="main-table">
                <thead>
                    <tr>
                        <th>ID ORDEN</th>
                        <th>CLIENTE</th>
                        <th>FECHA ANULACIÓN</th>
                        <th>MOTIVO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                <?php while($o = mysqli_fetch_assoc($ordenesAnuladas)): ?>
                <tr>
                    <td><?= $o['numero_orden'] ?></td>
                    <td><?= $o['nombre_cliente'] ?></td>
                    <td><?= date("Y-m-d H:i", strtotime($o['fecha_anulacion'])) ?></td>
                    <td><?= $o['motivo'] ?></td>
                    <td class="acciones-cell">
                        <button type="button" class="btn-action view">👁️</button>
                        <button type="button" class="btn-action restore" data-orden="<?= $o['numero_orden'] ?>">↩️</button>
                    </td>
                </tr>
                <?php endwhile; ?>
                </tbody>
            </table>
        </section>

        <!-- GESTIONAR ANULACIÓN -->
        <section id="section-gestion" class="tab-content">
            <div class="registro-clientes-tex">
                <div class="titulo-clientes-registro">
                    <h1>Gestionar Anulación</h1>
                    <p>Módulo Celestial Stereo — Anuladas</p>
                </div>
            </div>

            <form class="form-registro" method="POST" action="funciones/gestion_anulacion.php">
                <div class="form-grid">
                    <div class="form-group">
                        <label>ID DE ORDEN</label>
                        <input type="number" name="numero_orden" placeholder="001" required>
                    </div>
                    <div class="form-group">
                        <label>MOTIVO DE ANULACIÓN</label>
                        <input type="text" name="motivo" value="Por revisar" readonly>
                    </div>
                    <div class="form-group">
                        <label>COMENTARIOS</label>
                        <textarea name="comentarios" placeholder="Detalles adicionales..." rows="3"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn-save">ANULAR ORDEN</button>
                <button type="reset" class="btn-limpiar">LIMPIAR</button>
            </form>
        </section>
    </div>
</main>

<script src="../js/anuladas.js"></script>
</body>
</html>