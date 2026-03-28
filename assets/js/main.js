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

// ==================== GESTOR DE CANCIONES DE YOUTUBE ====================
/**
 * VALIDADOR Y GESTOR DE CANCIONES - BOT DE VERIFICACIÓN CON FIREBASE
 * Verifica URLs de YouTube y gestiona una lista de canciones en Firebase
 */

class YouTubeSongManager {
    constructor() {
        this.songs = [];
        this.useFirebase = typeof firebase !== 'undefined' && firebase.database;
        this.useFirestore = typeof firebase !== 'undefined' && firebase.firestore;
        this.firebaseListener = null;
        this.init();
    }

    /**
     * Inicializar event listeners y cargar canciones
     */
    init() {
        const input = document.getElementById('youtubeUrlInput');
        const btn = document.getElementById('addSongBtn');
        
        if (!input || !btn) {
            console.error('Elementos del formulario no encontrados');
            return;
        }

        btn.addEventListener('click', () => this.handleAddSong());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddSong();
        });

        // Cargar canciones (prefiere Firestore si está disponible)
        if (this.useFirestore) {
            this.loadSongsFromFirestore();
        } else if (this.useFirebase) {
            this.loadSongsFromFirebase();
        } else {
            this.songs = this.loadSongsFromLocal();
            this.renderSongs();
        }
    }

    /**
     * Cargar canciones desde Firestore con listener en tiempo real
     */
    loadSongsFromFirestore() {
        if (!window.firestore) return;
        this.firebaseListener = window.firestore.collection('sharedLinks').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                this.songs = [];
                snapshot.forEach((doc) => {
                    this.songs.push({ id: doc.id, ...doc.data() });
                });
                this.renderSongs();
            }, (error) => {
                console.error('Error cargando de Firestore:', error);
                this.songs = this.loadSongsFromLocal();
                this.renderSongs();
            });
    }

    /**
     * Cargar canciones desde Firebase con listener en tiempo real
     */
    loadSongsFromFirebase() {
        const dbRef = (window.database || database).ref('claraSongs/songs');
        
        dbRef.on('value', (snapshot) => {
            this.songs = [];
            
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    this.songs.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
            }
            
            // Invertir para mostrar más recientes primero
            this.songs.reverse();
            this.renderSongs();
        }, (error) => {
            console.error('Error cargando de Firebase:', error);
            // Fallback a localStorage
            this.songs = this.loadSongsFromLocal();
            this.renderSongs();
        });
        
        this.firebaseListener = dbRef;
    }

    /**
     * VALIDADOR DE URL DE YOUTUBE
     * Verifica si la entrada es una URL válida de YouTube o un título
     * @param {string} input - La URL o título ingresado
     * @returns {object} {isValid: boolean, url: string, title: string, type: string}
     */
    validateYouTubeInput(input) {
        const trimmed = input.trim();
        
        if (!trimmed) {
            return { isValid: false, error: 'Por favor ingresa una URL o título' };
        }

        // Patrones de YouTube
        const youtubePatterns = [
            /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=/,
            /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=/
        ];

        const isYouTubeUrl = youtubePatterns.some(pattern => pattern.test(trimmed));

        if (isYouTubeUrl) {
            // Extraer video ID
            let videoId = null;
            
            if (trimmed.includes('youtube.com/watch')) {
                try {
                    const urlParams = new URL(trimmed.includes('http') ? trimmed : 'https://youtube.com' + trimmed);
                    videoId = urlParams.searchParams.get('v');
                } catch (e) {
                    console.error('Error parseando URL:', e);
                }
            } else if (trimmed.includes('youtu.be')) {
                videoId = trimmed.split('youtu.be/')[1]?.split('?')[0] || null;
            }

            return {
                isValid: true,
                url: trimmed,
                videoId: videoId,
                type: 'youtube_url',
                title: this.extractTitleFromUrl(trimmed) || 'Canción de YouTube'
            };
        }

        // Si no es URL de YouTube pero parece válido (más de 3 caracteres)
        if (trimmed.length > 3 && !trimmed.includes(' ') && trimmed.includes('.com')) {
            return { 
                isValid: false, 
                error: '⚠️ Asegúrate de ingresar una URL válida de YouTube' 
            };
        }

        // Aceptar como título si tiene más de 3 caracteres
        if (trimmed.length > 3) {
            return {
                isValid: true,
                url: null,
                type: 'text_title',
                title: trimmed
            };
        }

        return { 
            isValid: false, 
            error: 'El texto debe tener al menos 4 caracteres' 
        };
    }

    /**
     * Extrae el título de una URL (si está disponible)
     */
    extractTitleFromUrl(url) {
        try {
            const urlObj = new URL(url.includes('http') ? url : 'https://' + url);
            const title = urlObj.searchParams.get('title');
            return title || null;
        } catch {
            return null;
        }
    }

    /**
     * Maneja el evento de agregar canción
     */
    async handleAddSong() {
        const input = document.getElementById('youtubeUrlInput');
        
        if (!input) return;

        const validation = this.validateYouTubeInput(input.value);
        
        if (!validation.isValid) {
            this.showError(validation.error || 'Error desconocido');
            return;
        }

        // Crear objeto de canción
        const song = {
            title: validation.title,
            url: validation.url,
            videoId: validation.videoId || null,
            type: validation.type,
            timestamp: new Date().toISOString(),
            addedBy: 'Usuario'
        };

        // Verificar duplicados
        if (this.songs.some(s => s.title === song.title)) {
            this.showError('❌ Esta canción ya está en la lista');
            return;
        }

        // Agregar canción
        if (this.useFirestore) {
            try {
                await addLinkToFirestore(song);
                input.value = '';
                this.showSuccess('✅ Canción agregada correctamente (Firestore)');
            } catch (error) {
                console.error('Error guardando en Firestore:', error);
                this.showError('❌ Error al guardar la canción');
            }
        } else if (this.useFirebase) {
            try {
                const dbRef = (window.database || database).ref('claraSongs/songs');
                await dbRef.push(song);
                input.value = '';
                this.showSuccess('✅ Canción agregada correctamente');
            } catch (error) {
                console.error('Error guardando en Firebase:', error);
                this.showError('❌ Error al guardar la canción');
            }
        } else {
            // Fallback a localStorage
            song.id = Date.now();
            this.songs.unshift(song);
            this.saveSongsLocal();
            this.renderSongs();
            input.value = '';
            this.showSuccess('✅ Canción agregada correctamente');
        }
    }

    /**
     * Elimina una canción de la lista
     */
    removeSong(id) {
        if (this.useFirestore) {
            if (!window.firestore) return;
            window.firestore.collection('sharedLinks').doc(id).delete()
                .catch(error => {
                    console.error('Error eliminando de Firestore:', error);
                    this.showError('❌ Error al eliminar la canción');
                });
        } else if (this.useFirebase) {
            const dbRef = (window.database || database).ref(`claraSongs/songs/${id}`);
            dbRef.remove()
                .catch(error => {
                    console.error('Error eliminando de Firebase:', error);
                    this.showError('❌ Error al eliminar la canción');
                });
        } else {
            this.songs = this.songs.filter(s => s.id !== id);
            this.saveSongsLocal();
            this.renderSongs();
        }
    }

    /**
     * Reproduce una canción (abre en YouTube)
     */
    playSong(url, title) {
        if (url) {
            window.open(url, '_blank');
        } else {
            // Buscar en YouTube si no hay URL
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
            window.open(searchUrl, '_blank');
        }
    }

    /**
     * Renderiza la grilla de canciones
     */
    renderSongs() {
        const grid = document.getElementById('songsGrid');
        if (!grid) {
            console.error('Grid no encontrada');
            return;
        }

        if (this.songs.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-state-icon">🎵</div>
                    <p>Agrega canciones para compartir la música de tu celebración</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.songs.map((song, index) => {
            const safeTitle = this.escapeHtml(song.title);
            const safeUrl = song.url ? this.escapeHtml(song.url) : '';
            const songLink = `${safeTitle}`;

            return `
                <div class="song-card" data-id="${song.id}">
                    <div class="song-thumbnail" title="${song.type === 'youtube_url' ? 'YouTube' : 'A pedido'}">
                        ${song.type === 'youtube_url' ? '📺' : '🎵'}
                    </div>
                    <div class="song-title" title="${safeTitle}">${songLink}</div>
                    <div class="song-url" title="${safeUrl || 'Título ingresado manualmente'}" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${safeUrl ? safeUrl : 'Título personalizado'}
                    </div>
                    <div class="song-actions">
                        <button class="btn-play" data-index="${index}" type="button">
                            <i class="fas fa-play"></i> Reproducir
                        </button>
                        <button class="btn-remove" data-id="${song.id}" type="button">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Event handlers sin inline JS, para compatibilidad y evitar problemas con comillas
        const playButtons = grid.querySelectorAll('.btn-play');
        playButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const idx = Number(btn.dataset.index);
                const selectedSong = this.songs[idx];
                if (!selectedSong) return;
                this.playSong(selectedSong.url, selectedSong.title);
            });
        });

        const removeButtons = grid.querySelectorAll('.btn-remove');
        removeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const songId = btn.dataset.id;
                if (songId) this.removeSong(songId);
            });
        });
    }

    /**
     * Muestra mensaje de error
     */
    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (!errorDiv) return;
        
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.classList.add('show');
        setTimeout(() => errorDiv.classList.remove('show'), 4000);
    }

    /**
     * Muestra mensaje de éxito
     */
    showSuccess(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (!errorDiv) return;
        
        errorDiv.textContent = message;
        errorDiv.style.color = '#6bff6b';
        errorDiv.classList.add('show');
        setTimeout(() => {
            errorDiv.classList.remove('show');
            errorDiv.style.color = '#ff6b6b';
        }, 3000);
    }

    /**
     * Escapa caracteres HTML para prevenir XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Guarda las canciones en localStorage (fallback)
     */
    saveSongsLocal() {
        try {
            localStorage.setItem('claraParty_songs', JSON.stringify(this.songs));
        } catch (e) {
            console.error('Error al guardar en localStorage:', e);
        }
    }

    /**
     * Carga las canciones desde localStorage (fallback)
     */
    loadSongsFromLocal() {
        try {
            const saved = localStorage.getItem('claraParty_songs');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error al cargar de localStorage:', e);
            return [];
        }
    }
}

// Crear instancia global del gestor
let songManager = null;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Esperar a que Firebase esté disponible
        if (typeof firebase !== 'undefined') {
            songManager = new YouTubeSongManager();
        } else {
            // Fallback sin Firebase
            console.warn('Firebase no disponible, usando localStorage');
            setTimeout(() => {
                if (!songManager) {
                    songManager = new YouTubeSongManager();
                }
            }, 500);
        }
    });
} else {
    if (typeof firebase !== 'undefined') {
        songManager = new YouTubeSongManager();
    } else {
        console.warn('Firebase no disponible, usando localStorage');
        setTimeout(() => {
            if (!songManager) {
                songManager = new YouTubeSongManager();
            }
        }, 500);
    }
}
