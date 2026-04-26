# Casabero UX/UI Manifesto & Design System

Este documento establece las reglas visuales y arquitectónicas de frontend para todo el ecosistema de aplicaciones **Casabero** (POS, Karta-GIS, Magister, Menta, etc.).

Cualquier agente IA o desarrollador que genere interfaces **DEBE** acatar estas directrices obligatoriamente. La filosofía central es la **transparencia pura, minimalismo y elegancia**.

---

## 1. Transparencia de Estado (State Clarity)
La interfaz debe comunicar estéticamente todo lo que sucede.
*   **Progresos Claros:** Se prohíben los spinners o progresos de carga circulares genéricos. Usa barras de carga sutiles, lineales y elegantes (estilo Karta-GIS) en la parte superior o integradas en el componente.
*   **Feedback Inmediato:** El usuario nunca debe preguntarse si un click funcionó. Usa esqueletos de carga (skeleton loaders) de opacidad pulsante (breathe) mientras la data llega.

## 2. Formularios e Inputs Perfectos
*   **Legibilidad Suprema:** El contenido dentro de los inputs (números o letras) debe estar cuidado, con padding amplio y tipografía nítida.
*   **Auto-Focus e Input Mode:** El teclado móvil debe adaptarse al dato (usar `inputmode="numeric"` para montos/teléfonos). El input principal debe recibir focus automático al abrir un modal o pantalla.
*   **Prevención:** Información clara sobre el formato esperado antes de que el usuario se equivoque.

## 3. Paleta de Colores (Armonía Restringida)
*   **Regla de los 3 Colores:** No se aceptan paletas multicolor a menos que sea explícitamente pedido. Si se requiere color, se usarán máximo **3 colores pasteles** con armonía matemática obligatoria.
*   El agente debe sugerir la paleta basándose en la naturaleza del proyecto.
*   Por defecto, la UI es monocromática (fondos blancos/grises oscuros, bordes tenues) y el color se usa solo para acentos semánticos.

## 4. Dark Mode y Responsividad Táctil
*   **Dark Mode Obligatorio:** Toda app debe tener un modo oscuro cuidado a la perfección, controlable mediante un toggle (típicamente esquina superior derecha o inferior izquierda).
*   **Responsive Intencional:** El click del mouse y el toque del dedo son diferentes. En pantallas móviles, los *touch targets* deben ser amplios (mínimo 44x44px). Si hay que cambiar drásticamente el layout para que el uso táctil sea ergonómico, se hace sin vacilar (ej. cambiar sidebars por bottom-sheets).

## 5. Menú de Ayuda e Intuición Primaria
*   **Intuición como Pilar:** La intuición en el diseño es la prioridad absoluta al inicio del desarrollo.
*   **Ayuda Integrada:** Toda aplicación debe incluir un menú de ayuda (visual o interactivo) que ilustre de manera extremadamente fácil cómo usar la app. El usuario nunca debe sentirse perdido.

## 6. Animación y "Quiet Motion"
*   **Inspiración "Liquid Glass":** Las animaciones deben ser hermosas, fluidas y evocar el *liquid glass* de Apple. 
*   No hay rebotes toscos. Usa transiciones de opacidad y transformaciones suaves apoyadas en curvas como `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

## 7. Arquitectura Frontend Inquebrantable
1.  **Cero Tailwind CSS (Por Defecto):** Usamos **Vanilla CSS** con CSS Custom Properties (Variables).
2.  **Arquitectura "Dumb":** Componentes React "tontos" acoplados a su archivo CSS homónimo (ej: `Card.tsx` + `card.css`).
3.  **Tarjetas Premium:** Bordes ultra sutiles (1px `#E5E5E5`), fondo blanco puro, y sombras casi imperceptibles en reposo que se elevan al hover.
4.  **Tipografías Semánticas:** Armonía absoluta. Outfit (Títulos), Inter (Cuerpo), Fira Code (Montos numéricos, SKUs). El agente puede sugerir otras si el proyecto lo demanda, pero la armonía es ley.

## 8. Botones y Elementos Interactivos

### Light Mode
- **Fondo del botón:** `#EEF2F7`
- **Borde del botón:** `#D5DEE8`
- **Texto del botón:** `#1A202C`

### Dark Mode
- **Fondo del botón:** `#1E2533`
- **Borde del botón:** `#2D3748`
- **Texto del botón:** `#E2E8F0`

### Comportamiento
- **Hover Light:** Fondo `#E2E8F0`, borde `#CBD5E1`
- **Hover Dark:** Fondo `#2D3748`, borde `#4A5568`
- **Active/Pressed:** Opacidad 0.85
- **Disabled:** Opacidad 0.5, sin hover effect
- **Border radius:** `8px` por defecto
- **Padding vertical:** `10px 16px` (estándar), `14px 24px` (botones grandes)

### Botones Primarios (Brand / Acción Principal)
- **Light:** Fondo `#1A202C`, texto `#FFFFFF`, borde `#1A202C`
- **Dark:** Fondo `#E2E8F0`, texto `#1A202C`, borde `#E2E8F0`

### Botones de Peligro (Destructive / Eliminar)
- **Light:** Fondo `#FEF2F2`, borde `#FECACA`, texto `#991B1B`
- **Dark:** Fondo `#2D1B1B`, borde `#4A2222`, texto `#FCA5A5`

[* Espacio para más elementos según crezca el manifiesto *]
