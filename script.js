const btnNo = document.getElementById('btn-rechazar');
const btnYes = document.getElementById('btn-aceptar');
const buttonsContainer = document.querySelector('.buttons-container');
const modal = document.getElementById('funny-modal');

function moverBotonNo() {
    const containerRect = buttonsContainer.getBoundingClientRect();
    const yesRect = btnYes.getBoundingClientRect();
    const noRect = btnNo.getBoundingClientRect();

    // Cambiar a posicionamiento absoluto solo cuando se inicia la interacción
    if (btnNo.style.position !== 'absolute') {
        btnNo.style.position = 'absolute';
    }

    const padding = 15;
    const maxX = containerRect.width - noRect.width - padding;
    const maxY = containerRect.height - noRect.height - padding;

    let randomX, randomY;
    let colision = true;
    let intentos = 0;

    // Buscar una posición aleatoria que NO se cruce con el botón 'Aceptar'
    while (colision && intentos < 50) {
        randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        // Convertir a coordenadas relativas al contenedor para evaluar colisión
        const noFutureLeft = containerRect.left + randomX;
        const noFutureTop = containerRect.top + randomY;

        // Verificar si se enciman
        const seSolapan = !(
            noFutureLeft + noRect.width < yesRect.left - 10 ||
            noFutureLeft > yesRect.right + 10 ||
            noFutureTop + noRect.height < yesRect.top - 10 ||
            noFutureTop > yesRect.bottom + 10
        );

        if (!seSolapan) {
            colision = false;
        }
        intentos++;
    }

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

// Eventos de interacción
btnNo.addEventListener('mouseenter', moverBotonNo);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Bloquea la pulsación táctil en celulares
    moverBotonNo();
});

// Evento al dar clic en Aceptar
btnYes.addEventListener('click', () => {
    window.open('https://www.youtube.com/watch?v=FTvvaH5ou1I', '_blank');
    modal.classList.remove('hidden');
});

// Cerrar modal al hacer clic
modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});