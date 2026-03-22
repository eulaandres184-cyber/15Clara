# 📚 Guía Completa de Fuentes - Proyecto Clara 15 Años

## Resumen
Se ha agregado una librería completa de fuentes de Google Fonts + Font Awesome al proyecto. Todas las fuentes están disponibles para usar en HTML, CSS y JavaScript.

---

## 🎨 FUENTES PRINCIPALES (Ya configuradas)

### 1. **Great Vibes** - `var(--font-elegante)`
- **Uso**: Títulos elegantes y frescos
- **Ejemplo CSS**: `font-family: var(--font-elegante);`
- **Descripción**: Fuente script elegante, perfecta para nombres y títulos especiales
- **Estilos**: Regular

### 2. **Fraunces** - `var(--font-titulo)`
- **Uso**: Títulos y encabezados
- **Ejemplo CSS**: `font-family: var(--font-titulo);`
- **Descripción**: Serif moderna y sofisticada
- **Estilos**: 400, 500, 700, 900

### 3. **Montserrat** - `var(--font-base)`
- **Uso**: Texto base, párrafos
- **Ejemplo CSS**: `font-family: var(--font-base);`
- **Descripción**: Sans-serif moderna y legible
- **Estilos**: 300, 400, 500, 600, 700, 800, 900

---

## 🎭 FUENTES ADICIONALES (Listos para usar)

### 4. **Playfair Display** - `var(--font-playfair)`
- **Uso**: Títulos grandes, diseño editorial
- **Ejemplo**: `font-family: var(--font-playfair);`
- **Estilos**: 400, 500, 600, 700, 800, 900

### 5. **Lora** - `var(--font-lora)`
- **Uso**: Texto largo, artículos
- **Ejemplo**: `font-family: var(--font-lora);`
- **Estilos**: 400, 500, 600, 700

### 6. **Poppins** - `var(--font-poppins)`
- **Uso**: Interfaz moderna, botones
- **Ejemplo**: `font-family: var(--font-poppins);`
- **Estilos**: 300, 400, 500, 600, 700, 800, 900

### 7. **Roboto** - `var(--font-roboto)`
- **Uso**: Texto limpio y profesional
- **Ejemplo**: `font-family: var(--font-roboto);`
- **Estilos**: 300, 400, 500, 700, 900

### 8. **Inter** - `var(--font-inter)`
- **Uso**: UI moderna, contenido digital
- **Ejemplo**: `font-family: var(--font-inter);`
- **Estilos**: 300, 400, 500, 600, 700, 800, 900

### 9. **Pacifico** - `var(--font-pacifico)`
- **Uso**: Títulos juguetones, acentos
- **Ejemplo**: `font-family: var(--font-pacifico);`
- **Estilos**: Regular

### 10. **Bebas Neue** - `var(--font-bebas)`
- **Uso**: Títulos grandes, impacto
- **Ejemplo**: `font-family: var(--font-bebas);`
- **Estilos**: Regular

### 11. **Cinzel** - `var(--font-cinzel)`
- **Uso**: Elegancia clásica, títulos
- **Ejemplo**: `font-family: var(--font-cinzel);`
- **Estilos**: 400, 600, 700, 800, 900

### 12. **Cormorant Garamond** - `var(--font-cormorant)`
- **Uso**: Textos elegantes, formal
- **Ejemplo**: `font-family: var(--font-cormorant);`
- **Estilos**: 400, 500, 600, 700

---

## 🎯 Cómo Usar las Fuentes

### En CSS:
```css
/* Usar variable CSS */
h1 {
    font-family: var(--font-elegante);
}

p {
    font-family: var(--font-base);
}

.titulo-especial {
    font-family: var(--font-playfair);
    font-weight: 700;
    font-size: 2.5rem;
}
```

### En HTML (inline):
```html
<h1 style="font-family: var(--font-elegante);">Mi Título</h1>
<p style="font-family: var(--font-base);">Mi párrafo</p>
```

### En JavaScript:
```javascript
element.style.fontFamily = "var(--font-poppins)";
// O
element.style.fontFamily = "'Poppins', sans-serif";
```

---

## 🎨 ICONOS - Font Awesome

Font Awesome 6.4.0 está incluido. Puedes usar iconos en todo el proyecto:

### Ejemplos:
```html
<!-- Corazón -->
<i class="fas fa-heart"></i>

<!-- Estrella -->
<i class="fas fa-star"></i>

<!-- Música -->
<i class="fas fa-music"></i>

<!-- Calendario -->
<i class="fas fa-calendar"></i>

<!-- Ubicación -->
<i class="fas fa-map-marker-alt"></i>
```

Más iconos disponibles en: https://fontawesome.com/icons

---

## 📊 Recomendaciones de Uso

| Elemento | Fuente Recomendada | Peso (weight) |
|----------|-------------------|---------------|
| H1 (Grandes títulos) | `--font-elegante` o `--font-playfair` | 700-900 |
| H2, H3 (Subtítulos) | `--font-titulo` o `--font-poppins` | 600-700 |
| Párrafos | `--font-base` o `--font-lora` | 400-500 |
| Botones | `--font-poppins` | 600-700 |
| Acentos | `--font-pacifico` o `--font-cinzel` | Regular/700 |
| Fecha/Hora | `--font-roboto` o `--font-inter` | 400-500 |

---

## ✅ Checklist de Implementación

- ✅ Google Fonts importadas en `index.html`
- ✅ Font Awesome importado en `index.html`
- ✅ Variables CSS configuradas en `style.css`
- ✅ Fuentes listas para usar en todos los archivos

---

## 🔗 Enlaces Útiles

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Documentación de CSS Variables](https://developer.mozilla.org/es/docs/Web/CSS/--*)

---

**¡Las fuentes están listas! Usa las variables CSS en cualquier archivo del proyecto.**
