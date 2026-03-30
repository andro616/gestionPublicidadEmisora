// Esperamos a que el HTML cargue completo.
document.addEventListener('DOMContentLoaded', function () {
    // Input del correo de destino.
    var inputCorreo = document.getElementById('confirm-correo');

    // Input del asunto.
    var inputAsunto = document.getElementById('confirm-asunto');

    // Input del mensaje.
    var inputMensaje = document.getElementById('confirm-mensaje');

    // Elementos de vista previa.
    var previewCorreo = document.getElementById('preview-correo');
    var previewAsunto = document.getElementById('preview-asunto');
    var previewMensaje = document.getElementById('preview-mensaje');

    // Formulario principal.
    var formConfirmacion = document.getElementById('form-confirmacion');

    // Caja de mensajes de estado.
    var statusConfirmacion = document.getElementById('confirmacion-status');

    // Botón para guardar plantilla.
    var btnGuardarPlantilla = document.getElementById('btn-guardar-plantilla');

    // Botones de tokens (por ejemplo {cliente}, {fecha}, etc.).
    var tokenButtons = document.querySelectorAll('.token-btn');

    // Muestra un estado visual en la caja de mensajes.
    function mostrarEstado(tipo, mensaje) {
        // Si no existe la caja, salimos.
        if (!statusConfirmacion) {
            return;
        }

        // Definimos las clases de estado.
        statusConfirmacion.className = 'confirmacion-status show ' + tipo;

        // Definimos el texto del estado.
        statusConfirmacion.textContent = mensaje;
    }

    // Actualiza la vista previa del correo.
    function actualizarVistaPrevia() {
        // Actualizamos correo en vista previa.
        if (previewCorreo && inputCorreo) {
            previewCorreo.textContent = inputCorreo.value || 'sin-destinatario@correo.com';
        }

        // Actualizamos asunto en vista previa.
        if (previewAsunto && inputAsunto) {
            previewAsunto.textContent = inputAsunto.value || 'Sin asunto';
        }

        // Actualizamos mensaje en vista previa.
        if (previewMensaje && inputMensaje) {
            previewMensaje.textContent = inputMensaje.value || 'Sin contenido';
        }
    }

    // Inserta un token dentro del textarea en la posición del cursor.
    function insertarToken(token) {
        // Si no existe el textarea, salimos.
        if (!inputMensaje) {
            return;
        }

        // Posición inicial del cursor.
        var start = (typeof inputMensaje.selectionStart === 'number') ? inputMensaje.selectionStart : inputMensaje.value.length;

        // Posición final del cursor.
        var end = (typeof inputMensaje.selectionEnd === 'number') ? inputMensaje.selectionEnd : inputMensaje.value.length;

        // Texto antes de la selección.
        var before = inputMensaje.value.slice(0, start);

        // Texto después de la selección.
        var after = inputMensaje.value.slice(end);

        // Si hace falta, agregamos salto de línea antes del token.
        var insertion = ((before && !before.endsWith('\n')) ? '\n' : '') + token;

        // Construimos el nuevo valor completo.
        inputMensaje.value = before + insertion + after;

        // Regresamos el foco al textarea.
        inputMensaje.focus();

        // Calculamos nueva posición del cursor.
        var newCursor = before.length + insertion.length;

        // Dejamos el cursor al final de lo insertado.
        inputMensaje.setSelectionRange(newCursor, newCursor);

        // Refrescamos vista previa.
        actualizarVistaPrevia();
    }

    // Escuchamos cambios en el input de correo.
    if (inputCorreo) {
        inputCorreo.addEventListener('input', actualizarVistaPrevia);
    }

    // Escuchamos cambios en el input de asunto.
    if (inputAsunto) {
        inputAsunto.addEventListener('input', actualizarVistaPrevia);
    }

    // Escuchamos cambios en el input de mensaje.
    if (inputMensaje) {
        inputMensaje.addEventListener('input', actualizarVistaPrevia);
    }

    // Recorremos todos los botones de token.
    for (var i = 0; i < tokenButtons.length; i++) {
        // Guardamos el botón actual.
        var button = tokenButtons[i];

        // Agregamos evento click al botón actual.
        button.addEventListener('click', function () {
            // Leemos el token desde data-token.
            var token = this.getAttribute('data-token');

            // Si hay token, lo insertamos.
            if (token) {
                insertarToken(token);
            }
        });
    }

    // Escuchamos el envío del formulario.
    if (formConfirmacion) {
        formConfirmacion.addEventListener('submit', function (event) {
            // Evitamos recarga de página.
            event.preventDefault();

            // Validamos que exista correo de destino.
            if (!inputCorreo || !inputCorreo.value.trim()) {
                mostrarEstado('info', 'Debes indicar el correo del cliente antes de enviar la confirmación.');
                return;
            }

            // Mostramos mensaje de éxito.
            mostrarEstado('success', 'La confirmación quedó lista para envío al cliente.');
        });
    }

    // Evento para guardar plantilla.
    if (btnGuardarPlantilla) {
        btnGuardarPlantilla.addEventListener('click', function () {
            // Mostramos mensaje informativo.
            mostrarEstado('info', 'La plantilla del correo fue guardada correctamente.');
        });
    }

    // Tomamos links del menú superior.
    var menuLinks = document.querySelectorAll('header nav ul li a');

    // Obtenemos archivo actual de la URL.
    var currentPath = window.location.pathname.split('/').pop();

    // Recorremos cada link para activar el que corresponde.
    for (var j = 0; j < menuLinks.length; j++) {
        // Link actual.
        var link = menuLinks[j];

        // Href del link actual.
        var href = link.getAttribute('href');

        // Si coincide con la página actual, lo marcamos activo.
        if (href === currentPath || (href === 'index.html' && currentPath === '')) {
            link.classList.add('active-link');
        } else {
            // Si no coincide, quitamos activo.
            link.classList.remove('active-link');
        }
    }

    // Inicializamos la vista previa al cargar.
    actualizarVistaPrevia();
});