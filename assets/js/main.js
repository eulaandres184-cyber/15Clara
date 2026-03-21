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
    const modal = document.getElementById('welcomeModal');
    const header = document.querySelector('header');
    const carouselSection = document.querySelector('section.container');
    const infoSection = document.querySelector('section.info');
    
    if (modal) {
        // Agregar la clase para iniciar el fade-out del modal
        modal.classList.add('fading-out');
        
        // Iniciar el fade-in del contenido principal con delays progresivos
        if (header) {
            setTimeout(() => {
                header.classList.add('fade-in-content');
            }, 100);
        }
        
        if (carouselSection) {
            setTimeout(() => {
                carouselSection.classList.add('fade-in-content');
            }, 300);
        }
        
        if (infoSection) {
            setTimeout(() => {
                infoSection.classList.add('fade-in-content');
            }, 500);
        }
        
        // Esperar a que termine la animación de fade-out antes de ocultar el modal completamente
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 600);
    }

    // Reproducir la música automáticamente al entrar
    const musica = document.getElementById('musicaFondo');
    if (musica) {
        musica.play().catch(error => {
            console.log("El navegador bloqueó el autoplay, pero el clic debería permitirlo.");
        });
    }
}

// Indicador de Scroll - Mostrar/Ocultar y hacer clickeable
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroSection = document.querySelector('.hero');

if (scrollIndicator) {
    // Mostrar el indicador al comienzo
    scrollIndicator.classList.remove('hidden');
    
    // Manejar el click en el indicador para hacer scroll suave
    scrollIndicator.addEventListener('click', () => {
        const carouselSection = document.querySelector('section.container');
        if (carouselSection) {
            carouselSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Cambiar visibilidad del indicador basado en el scroll
    const toggleScrollIndicator = () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const currentScroll = window.pageYOffset + window.innerHeight;
        
        // Si hemos descendido más allá del hero, ocultar el indicador
        if (currentScroll > heroBottom) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    };
    
    window.addEventListener('scroll', toggleScrollIndicator);
    window.addEventListener('resize', toggleScrollIndicator);
}
