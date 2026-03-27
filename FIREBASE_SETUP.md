# 🔥 Configuración de Firebase - Guía Paso a Paso

## Descripción
Este proyecto utiliza **Firebase Realtime Database** para almacenar y sincronizar las canciones de YouTube en tiempo real. Las canciones se guardan en la nube y se sincronizan automáticamente entre todos los visitantes.

---

## 📋 Paso 1: Crear un proyecto en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Hacer clic en **"Agregar proyecto"** o **"Create project"**
3. Ingresar nombre del proyecto: `clarascelebration` (o el que prefieras)
4. Aceptar las condiciones y hacer clic en **"Crear proyecto"**
5. Esperar a que se cree el proyecto

---

## 📋 Paso 2: Habilitar Realtime Database

1. En la consola de Firebase, ir a **Realtime Database** (lado izquierdo, en "Build")
2. Hacer clic en **"Crear base de datos"** o **"Create Database"**
3. Elegir ubicación: Seleccionar región más cercana (ej: `us-central1`)
4. Eligir modo de seguridad: **"Iniciar en modo de prueba"** (para desarrollo)
   - ⚠️ IMPORTANTE: En producción, configurar reglas de seguridad
5. Hacer clic en **"Habilitar"**

---

## 📋 Paso 3: Copiar las credenciales de Firebase

1. En la consola de Firebase, hacer clic en ⚙️ (engranaje) > **Configuración del proyecto**
2. Ir a la pestaña **"General"** o **"Mis aplicaciones"**
3. Buscar la sección **"Tu aplicación web"** o crear una aplicación
4. Hacer clic en el icono de `</>` (Web)
5. Copiar el objeto `firebaseConfig` que se muestra

El objeto tendrá este formato:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyD_...",
    authDomain: "clarascelebration.firebaseapp.com",
    databaseURL: "https://clarascelebration-default-rtdb.firebaseio.com",
    projectId: "clarascelebration",
    storageBucket: "clarascelebration.appspot.com",
    messagingSenderId: "123456789...",
    appId: "1:123456789:web:abc..."
};
```

---

## 📋 Paso 4: Actualizar el archivo firebase-config.js

1. Abrir el archivo: `assets/js/firebase-config.js`
2. Buscar:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyD_YOUR_API_KEY_HERE", // Reemplazar
    authDomain: "clarascelebration.firebaseapp.com",
    databaseURL: "https://clarascelebration-default-rtdb.firebaseio.com",
    projectId: "clarascelebration",
    storageBucket: "clarascelebration.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

3. Reemplazar TODOS los valores con los que copiaste de Firebase Console
4. Guardar el archivo

---

## 📋 Paso 5: Configurar Reglas de Seguridad (Importante)

1. En Firebase Console, ir a **Realtime Database** > **Reglas**
2. Reemplazar el contenido con:

```json
{
  "rules": {
    "claraSongs": {
      "songs": {
        ".read": true,
        ".write": true,
        "$songId": {
          ".validate": "newData.hasChildren(['title', 'type', 'timestamp'])"
        }
      }
    }
  }
}
```

3. Hacer clic en **"Publicar"**

---

## 🧪 Paso 6: Prueba

1. Abrir el sitio web en el navegador
2. Ir a la sección de canciones
3. Agregar una canción
4. Verificar que aparezca en la grilla
5. Abrir otra pestaña del navegador y verificar que la canción aparezca automáticamente (sincronización en tiempo real)

---

## 🔍 Solución de problemas

### ❌ "Firebase is not defined"
- Verificar que los scripts de Firebase estén en el HTML
- Verificar que `firebase-config.js` se cargue después de los scripts de Firebase

### ❌ Las canciones no se guardan
- Verificar que las credenciales de Firebase sean correctas
- Verificar que Realtime Database esté habilitada
- Abrir la consola del navegador (F12) y buscar errores rojo

### ❌ CORS error
- Esto es normal en desarrollo local
- Usar em servidor HTTPS en producción
- Considerar usar Firebase Hosting para alojar

---

## 📚 Estructura de datos en Firebase

Las canciones se almacenan en:
```
{
  "claraSongs": {
    "songs": {
      "-N1a2B3c4D5e6F7g8H9": {
        "title": "Canción 1",
        "url": "https://youtube.com/watch?v=...",
        "videoId": "abcdef123456",
        "type": "youtube_url",
        "timestamp": "2026-03-27T...",
        "addedBy": "Usuario"
      },
      "-N2a3B4c5D6e7F8g9H0": {
        "title": "Mi Canción",
        "url": null,
        "type": "text_title",
        "timestamp": "2026-03-27T...",
        "addedBy": "Usuario"
      }
    }
  }
}
```

---

## 🔒 Notas de Seguridad

- ⚠️ El `apiKey` en el código es **público** (visible en el navegador)
- ✅ Usa reglas de Firebase para controlar el acceso
- Se recomienda usar **Firebase Authentication** para usuarios registrados
- Para producción, ajustar reglas de escritura según necesidad

---

## 📞 Soporte

Si hay problemas:
1. Verificar la consola del navegador (F12 - Consola)
2. Verificar Firebase Console para ver si los datos se guardan
3. Revisar las reglas de Realtime Database
