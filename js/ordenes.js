document.addEventListener('DOMContentLoaded', () => {
    const btnLista = document.getElementById('tab-lista');
    const btnRegistro = document.getElementById('tab-registro');
    const btnFactura = document.getElementById('tab-factura');
    const btnCertificacion = document.getElementById('tab-certificacion');

    const sectionLista = document.getElementById('lista');
    const sectionRegistro = document.getElementById('registro');
    const sectionFactura = document.getElementById('factura');
    const sectionCertificacion = document.getElementById('certificacion');

    const btnGoFactura = document.getElementById('btn-go-factura');
    const btnGoCertificacion = document.getElementById('btn-go-certificacion');

    const tabs = [btnLista, btnRegistro, btnFactura, btnCertificacion].filter(Boolean);
    const sections = [sectionLista, sectionRegistro, sectionFactura, sectionCertificacion].filter(Boolean);

    function inicializarVista() {
        if (!btnLista || !sectionLista) return;
        activarTab(sectionLista, btnLista);
    }

    function activarTab(seccionActiva, botonActivo) {
        if (!seccionActiva || !botonActivo) return;

        sections.forEach(seccion => {
            seccion.classList.remove('active');
        });

        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        seccionActiva.classList.add('active');
        botonActivo.classList.add('active');
    }

    inicializarVista();

    if (btnLista && sectionLista) {
        btnLista.addEventListener('click', () => activarTab(sectionLista, btnLista));
    }

    if (btnRegistro && sectionRegistro) {
        btnRegistro.addEventListener('click', () => activarTab(sectionRegistro, btnRegistro));
    }

    if (btnFactura && sectionFactura) {
        btnFactura.addEventListener('click', () => activarTab(sectionFactura, btnFactura));
    }

    if (btnCertificacion && sectionCertificacion) {
        btnCertificacion.addEventListener('click', () => activarTab(sectionCertificacion, btnCertificacion));
    }

    if (btnGoFactura && btnFactura && sectionFactura) {
        btnGoFactura.addEventListener('click', () => activarTab(sectionFactura, btnFactura));
    }

    if (btnGoCertificacion && btnCertificacion && sectionCertificacion) {
        btnGoCertificacion.addEventListener('click', () => activarTab(sectionCertificacion, btnCertificacion));
    }

    const menuLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();

    menuLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === currentPath || (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
 // ================= DIAS =================
    const checkDias = document.querySelectorAll('#dias-container input');
    const inputDias = document.getElementById('ord-dias');

    if (checkDias.length && inputDias) {
        checkDias.forEach(chk => {
            chk.addEventListener('change', () => {
                const seleccionados = Array.from(checkDias)
                    .filter(c => c.checked)
                    .map(c => c.value);

                inputDias.value = seleccionados.join(', ');
            });
        });
    }

    // ================= HORARIOS =================
    const contHorarios = document.getElementById('horarios-container');
    const inputHorarios = document.getElementById('ord-horarios');
    const btnAdd = document.getElementById('addHora');

    if (contHorarios && inputHorarios && btnAdd) {

        btnAdd.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'time';
            input.classList.add('hora');

            contHorarios.insertBefore(input, btnAdd);
        });

        // Capturar antes de enviar
        const form = document.querySelector('form');

        if (form) {
            form.addEventListener('submit', () => {
                const horas = document.querySelectorAll('.hora');

                const lista = Array.from(horas)
                    .map(h => h.value)
                    .filter(v => v !== '');

                inputHorarios.value = lista.join(', ');
            });
        }
    }

});