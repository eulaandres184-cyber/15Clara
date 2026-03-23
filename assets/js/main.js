// ==================== CONFIGURACIÓN DE WHATSAPP ====================
const WHATSAPP_CONTACTS = {
    clara: {
        number: '2336453005',
        countryCode: '+54',
        name: 'Clara'
    },
    eli: {
        number: '2302632487',
        countryCode: '+54',
        name: 'Eli'
    }
};

/**
 * Genera un enlace de WhatsApp a partir de una clave de contacto
 * @param {string} contactKey - Clave del contacto (ej: 'clara', 'eli')
 * @returns {string} URL de WhatsApp completa
 */
function generateWhatsappLink(contactKey) {
    const contact = WHATSAPP_CONTACTS[contactKey];
    if (!contact) {
        console.warn(`Contacto '${contactKey}' no encontrado en WHATSAPP_CONTACTS`);
        return '#';
    }
    return `https://wa.me/${contact.countryCode}${contact.number}`;
}

/**
 * Inicializa todos los enlaces de WhatsApp en la página
 */
function initializeWhatsappLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
        const contactKey = link.dataset.whatsapp;
        link.href = generateWhatsappLink(contactKey);
    });
}

// ==================== MINI FOOTER PLAYER ====================
const audio = document.getElementById("musicaFondo");
const miniPlay = document.getElementById("mini-play");
const miniPrev = document.getElementById("mini-prev");
const miniNext = document.getElementById("mini-next");

if (audio && miniPlay) {
    const playIcon = miniPlay.querySelector('i');

    const togglePlay = (ev) => {
        if (ev && ev.type === 'pointerup') ev.preventDefault();
        if (audio.paused) {
            audio.play().catch(() => {});
            if (playIcon) { playIcon.classList.remove('fa-play'); playIcon.classList.add('fa-pause'); }
        } else {
            audio.pause();
            if (playIcon) { playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); }
        }
    };

    // Use pointer events so touch devices trigger reliably
    miniPlay.addEventListener('pointerup', togglePlay);
    // Fallback for older devices
    miniPlay.addEventListener('click', togglePlay);

    // Prev: rebobina 10s (pointer)
    if (miniPrev) {
        miniPrev.addEventListener('pointerup', (e) => { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 10); });
        miniPrev.addEventListener('click', (e) => { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 10); });
    }

    // Next: avanza 10s
    if (miniNext) {
        miniNext.addEventListener('pointerup', (e) => { e.preventDefault(); if (!isNaN(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });
        miniNext.addEventListener('click', (e) => { e.preventDefault(); if (!isNaN(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });
    }

    // Al terminar la pista
    audio.addEventListener('ended', () => {
        if (playIcon) { playIcon.classList.remove('fa-pause'); playIcon.classList.add('fa-play'); }
    });

}

/* // Mostrar fecha y hora actual en las minibox (reemplaza el contador)
const updateDateTime = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('es-AR', { month: 'long' });
    const time = now.toLocaleTimeString('es-AR', { hour12: false });

    const dayEl = document.getElementById('date-day');
    const monthEl = document.getElementById('date-month');
    const timeEl = document.getElementById('date-time');

    if (dayEl) dayEl.innerText = day;
    if (monthEl) monthEl.innerText = month.charAt(0).toUpperCase() + month.slice(1);
    if (timeEl) timeEl.innerText = time;
};

setInterval(updateDateTime, 1000);
updateDateTime();
 */

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
        // Actualizar icono del mini player si existe
        const mp = document.getElementById('mini-play');
        if (mp) {
            const i = mp.querySelector('i');
            if (i) { i.classList.remove('fa-play'); i.classList.add('fa-pause'); }
        }
    }
}

// Inicializar enlaces de WhatsApp cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWhatsappLinks);
} else {
    initializeWhatsappLinks();
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
