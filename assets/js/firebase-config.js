/**
 * CONFIGURACIÓN DE FIREBASE - Gestor de Canciones
 * Realtime Database para almacenar y sincronizar canciones
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPeWzo44LOpkZTDKMnzKYNCQrnEZCO71s",
    authDomain: "claramisxv-103c6.firebaseapp.com",
    databaseURL: "https://claramisxv-103c6-default-rtdb.firebaseio.com",
    projectId: "claramisxv-103c6",
    storageBucket: "claramisxv-103c6.firebasestorage.app",
    messagingSenderId: "788183965642",
    appId: "1:788183965642:web:4e0f09c484673469b3b933",
    measurementId: "G-XWRBPKZW4Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a Realtime Database
const database = firebase.database();

// Exponer en window para que otros scripts no dependan de verbo global de variables local
window.database = database;
window.firebase = firebase;
// Inicializar Firestore y exponerlo
if (firebase.firestore) {
    const firestore = firebase.firestore();
    window.firestore = firestore;
}
/**
 * Ruta de almacenamiento en Firebase
 * /claraSongs/songs -> Array de canciones
 */
const SONGS_db_PATH = 'claraSongs/songs';

/**
 * Observador de cambios en Firebase
 * Se ejecuta cada vez que cambia la lista de canciones
 */
function setupFirebaseListener(callback) {
    const dbRef = database.ref(SONGS_db_PATH);
    
    dbRef.on('value', (snapshot) => {
        const songs = [];
        snapshot.forEach((childSnapshot) => {
            songs.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Llamar callback con la lista actualizada
        if (typeof callback === 'function') {
            callback(songs);
        }
    });
    
    return dbRef; // Retornar referencia para poder cancelar listener después
}

/**
 * Agregar canción a Firebase
 */
async function addSongToFirebase(song) {
    try {
        const dbRef = database.ref(SONGS_db_PATH);
        await dbRef.push(song);
        return { success: true, message: 'Canción guardada en Firebase' };
    } catch (error) {
        console.error('Error guardando en Firebase:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Eliminar canción de Firebase
 */
async function removeSongFromFirebase(songId) {
    try {
        const dbRef = database.ref(`${SONGS_db_PATH}/${songId}`);
        await dbRef.remove();
        return { success: true, message: 'Canción eliminada' };
    } catch (error) {
        console.error('Error eliminando de Firebase:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener todas las canciones de Firebase (una sola vez)
 */
async function getSongsFromFirebase() {
    try {
        const snapshot = await database.ref(SONGS_db_PATH).get();
        const songs = [];
        
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                songs.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
        }
        
        return songs;
    } catch (error) {
        console.error('Error obteniendo canciones de Firebase:', error);
        return [];
    }
}

/**
 * Actualizar canción en Firebase
 */
async function updateSongInFirebase(songId, updates) {
    try {
        const dbRef = database.ref(`${SONGS_db_PATH}/${songId}`);
        await dbRef.update(updates);
        return { success: true, message: 'Canción actualizada' };
    } catch (error) {
        console.error('Error actualizando en Firebase:', error);
        return { success: false, error: error.message };
    }
}

// ---------------------
// Firestore helpers
// ---------------------
const LINKS_COLLECTION = 'sharedLinks';

/**
 * Agrega un link/canción a Firestore (collection: sharedLinks)
 */
async function addLinkToFirestore(linkObj) {
    if (!window.firestore) return { success: false, error: 'Firestore no inicializado' };
    try {
        const docRef = await window.firestore.collection(LINKS_COLLECTION).add(linkObj);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error guardando en Firestore:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtener todos los links desde Firestore (una sola vez)
 */
async function getLinksFromFirestore() {
    if (!window.firestore) return [];
    try {
        const snapshot = await window.firestore.collection(LINKS_COLLECTION).get();
        const items = [];
        snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
        return items;
    } catch (error) {
        console.error('Error obteniendo links de Firestore:', error);
        return [];
    }
}

/**
 * Observador en tiempo real de la colección sharedLinks
 */
function setupFirestoreListener(callback) {
    if (!window.firestore) return null;
    return window.firestore.collection(LINKS_COLLECTION).orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            const items = [];
            snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
            if (typeof callback === 'function') callback(items);
        }, (error) => {
            console.error('Firestore listener error:', error);
        });
}
