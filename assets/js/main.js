const audio = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("musicControl");
const icon = document.getElementById("musicIcon");

// Control de Música
btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        icon.innerText = "⏸️";
    } else {
        audio.pause();
        icon.innerText = "🎵";
    }
});

// Autoplay al primer toque
window.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        icon.innerText = "⏸️";
    }
}, { once: true });

// Cuenta regresiva (Fecha ejemplo: Navidad 2025)
const target = new Date("Dec 25, 2025 21:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const d = target - now;
    
    document.getElementById("days").innerText = Math.floor(d / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("mins").innerText = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
}, 1000);

//FUNCION PARA INICIAR LA EXPERIENCIA DESPUÉS DE CERRAR EL MODAL
function startExperience() {
    // Ocultar el modal
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('hidden');

    // Reproducir la música automáticamente al entrar
    const musica = document.getElementById('musicaFondo');
    if (musica) {
        musica.play().catch(error => {
            console.log("El navegador bloqueó el autoplay, pero el clic debería permitirlo.");
        });
    }
}
