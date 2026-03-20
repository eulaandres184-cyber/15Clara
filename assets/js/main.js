const audio = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("musicControl");
const icon = document.getElementById("musicIcon");

// Control de Música
if (btnMusica) {
    btnMusica.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            icon.innerText = "⏸️";
        } else {
            audio.pause();
            icon.innerText = "🎵";
        }
    });
}

// Autoplay al primer toque
window.addEventListener("click", () => {
    if (audio && audio.paused) {
        audio.play();
        if (icon) icon.innerText = "⏸️";
    }
}, { once: true });

// Cuenta regresiva
const target = new Date("Aug 22, 2026 21:30:00").getTime();

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const updateCountdown = () => {
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
        // Cuando la cuenta regresiva termina
        document.getElementById("days").innerText = 0;
        document.getElementById("hours").innerText = 0;
        document.getElementById("mins").innerText = 0;
        clearInterval(intervalId);
        return;
    }

    const days = Math.floor(distance / MS_IN_DAY);
    const hours = Math.floor((distance % MS_IN_DAY) / MS_IN_HOUR);
    const minutes = Math.floor((distance % MS_IN_HOUR) / MS_IN_MINUTE);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("mins").innerText = minutes;
};

const intervalId = setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente para no esperar 1 segundo


//FUNCION PARA INICIAR LA EXPERIENCIA DESPUÉS DE CERRAR EL MODAL
function startExperience() {
    // Ocultar el modal
    const modal = document.getElementById('welcomeModal');
    if (modal) modal.classList.add('hidden');

    // Reproducir la música automáticamente al entrar
    const musica = document.getElementById('musicaFondo');
    if (musica) {
        musica.play().catch(error => {
            console.log("El navegador bloqueó el autoplay, pero el clic debería permitirlo.");
        });
    }
}
