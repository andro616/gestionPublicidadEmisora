document.addEventListener('DOMContentLoaded', () => {
    const btnLista = document.getElementById('tab-lista');
    const btnRegistro = document.getElementById('tab-registro');
    const sectionLista = document.getElementById('lista');
    const sectionRegistro = document.getElementById('registro');

    function cambiarTab(seccionAMostrar, seccionAOcultar, botonActivo, botonInactivo) {
        if (!seccionAMostrar || !seccionAOcultar || !botonActivo || !botonInactivo) return;
        seccionAOcultar.style.display = 'none';
        seccionAMostrar.style.display = 'block';
        botonActivo.classList.add('active');
        botonInactivo.classList.remove('active');
    }

    if (btnLista && btnRegistro && sectionLista && sectionRegistro) {
        btnLista.addEventListener('click', () => {
            cambiarTab(sectionLista, sectionRegistro, btnLista, btnRegistro);
        });

        btnRegistro.addEventListener('click', () => {
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
        });
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
});