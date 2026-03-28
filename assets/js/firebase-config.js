/**
 * CONFIGURACIÓN DE FIREBASE - Gestor de Canciones
 * Realtime Database para almacenar y sincronizar canciones
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
/* SUSPENDIDO: Helpers y rutas para almacenar/gestionar canciones en Firebase/Firestore.
   Comentado temporalmente y marcado en suspenso.

// Ruta de almacenamiento en Firebase
// const SONGS_db_PATH = 'claraSongs/songs';

// function setupFirebaseListener(callback) { ... }
// async function addSongToFirebase(song) { ... }
// async function removeSongFromFirebase(songId) { ... }
// async function getSongsFromFirebase() { ... }
// async function updateSongInFirebase(songId, updates) { ... }

// Firestore helpers
// const LINKS_COLLECTION = 'sharedLinks';
// async function addLinkToFirestore(linkObj) { ... }
// async function getLinksFromFirestore() { ... }
// function setupFirestoreListener(callback) { ... }

*/
