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
const target = new Date("Ago 22, 2026 21:30:00").getTime();

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

// Carousel functionality
const images = [
    'assets/img/1.jpg',
    'assets/img/2.jpg',
    'assets/img/3.jpg',
    'assets/img/4.jpg',
    'assets/img/5.jpg',
    'assets/img/6.jpg',
    'assets/img/7.jpg',
   /*  'assets/img/IMG-20260303-WA0216.jpg.jpeg',
    'assets/img/IMG-20260303-WA0218.jpg.jpeg',
    'assets/img/IMG-20260303-WA0227.jpg.jpeg',
    'assets/img/IMG-20260303-WA0228.jpg.jpeg',
    'assets/img/IMG-20260303-WA0232.jpg.jpeg',
    'assets/img/IMG-20260303-WA0236.jpg.jpeg',
    'assets/img/IMG-20260303-WA0243.jpg.jpeg' */
];

let currentIndex = 0;
let autoSlideInterval;

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentIndex) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToImage(index));
        indicatorsContainer.appendChild(indicator);
    });
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateImage() {
    const img = document.getElementById('carousel-image');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = images[currentIndex];
        img.style.opacity = '1';
    }, 150);
    updateIndicators();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function goToImage(index) {
    currentIndex = index;
    updateImage();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 4000); // Change image every 4 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize carousel
createIndicators();
updateImage();
startAutoSlide();

// Pause auto-slide on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);
