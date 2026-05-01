# Casabero UX/UI Manifesto & Design System

Este documento establece las reglas visuales y arquitectónicas de frontend para todo el ecosistema de aplicaciones **Casabero** (POS, Karta-GIS, Magister, Menta, etc.).

Cualquier agente IA o desarrollador que genere interfaces **DEBE** acatar estas directrices obligatoriamente.

## Filosofía Central: Transparencia Radical + Complacencia

Todo proceso importante del software debe ser **visible, comprensible y placentero** para el usuario en tiempo real.

No aceptamos procesos en segundo plano sin feedback visible. La transparencia es un principio no negociable. La única excepción permitida son aquellos casos donde revelar información comprometa **seguridad o confidencialidad**; en esos casos se mostrará al menos un indicador genérico de actividad.

El objetivo final es doble:
- **Máxima transparencia:** el usuario siempre sabe qué está pasando.
- **Máxima complacencia:** el usuario disfruta tanto la experiencia que desea volver a usar la aplicación.

---

## 1. Transparencia de Estado (State Clarity)

La interfaz debe comunicar estéticamente todo lo que sucede.

### Reglas de Visualización y Feedback

- Toda operación que supere **800 ms** debe mostrar su estado de forma visible.
- **Barras de progreso horizontales obligatorias.** Fondo gris sutil (bajo contraste). La barra de avance debe reflejar el **porcentaje real** del proceso y actualizarse de forma fluida (mínimo cada 300 ms).
- **Se prohíben los círculos de carga (spinners).** Usa barras lineales y elegantes en la parte superior o integradas en el componente.
- Los estados de **éxito** y **error** se comunican exclusivamente mediante **animaciones** en la barra, **no con colores**:
  - **Completado:** Animación de pulso suave y elegante (gentle scale + fade).
  - **Error:** Animación sutil de sacudida horizontal o vibración breve.
- Debajo de cada barra debe aparecer siempre un **mensaje claro en lenguaje humano** que explique exactamente qué está ocurriendo.

**Ejemplo de progreso:**
- Subiendo archivo: Barra gris avanzando + texto: *"Subiendo tu documento de forma segura… 47%"*
- Completado: Barra llena + pulso suave + texto: *"¡Documento subido correctamente y protegido!"*
- Error: Barra con sacudida sutil + texto: *"No pudimos completar la subida. Revisa tu conexión e inténtalo de nuevo."*

### Feedback Inmediato

El usuario nunca debe preguntarse si un click funcionó. Usa esqueletos de carga (skeleton loaders) de opacidad pulsante (breathe) mientras la data llega.

---

## 2. Formularios e Inputs Perfectos

- **Legibilidad Suprema:** El contenido dentro de los inputs (números o letras) debe estar cuidado, con padding amplio y tipografía nítida.
- **Auto-Focus e Input Mode:** El teclado móvil debe adaptarse al dato (usar `inputmode="numeric"` para montos/teléfonos). El input principal debe recibir focus automático al abrir un modal o pantalla.
- **Prevención:** Información clara sobre el formato esperado antes de que el usuario se equivoque.
- **Validación visual:** Campo validado correctamente debe mostrar una pequeña animación de confirmación (línea o check minimalista que se dibuja suavemente).

---

## 3. Paleta de Colores (Armonía Restringida)

- **Regla de los 3 Colores:** No se aceptan paletas multicolor a menos que sea explícitamente pedido. Si se requiere color, se usarán máximo **3 colores pasteles** con armonía matemática obligatoria.
- El agente debe sugerir la paleta basándose en la naturaleza del proyecto.
- Por defecto, la UI es monocromática (fondos blancos/grises oscuros, bordes tenues) y el color se usa solo para acentos semánticos.

---

## 4. Diseño Visual y Jerarquía (Liquid Glass)

Adoptar un enfoque **minimalista, elegante y premium** inspirado en el sistema Liquid Glass de Apple: materiales translúcidos, profundidad sutil, reflejos dinámicos y adaptabilidad entre claro/oscuro.

### Jerarquía Visual

Priorizar la jerarquía mediante:
- Tamaño y peso tipográfico
- Espaciado generoso
- Capas con profundidad (efectos glassmorphism)
- Contenido siempre en primer plano

### Iconos

Solo se permiten **iconos minimalistas en línea** (sin relleno ni color). Nada de iconos sólidos, coloridos o recargados.

### Layout en Pantalla Grande

En pantallas grandes (PC, TV): el contenido debe estar **centrado** y ajustarse a la pantalla sin barras de desplazamiento horizontal ni vertical siempre que la naturaleza de los datos lo permita.

---

## 5. Dark Mode y Responsividad Táctil

- **Dark Mode Obligatorio:** Toda app debe tener un modo oscuro cuidado a la perfección, controlable mediante un toggle (típicamente esquina superior derecha o inferior izquierda).
- **Responsive Intencional:** El click del mouse y el toque del dedo son diferentes. En pantallas móviles, los *touch targets* deben ser amplios (mínimo 44x44px). Si hay que cambiar drásticamente el layout para que el uso táctil sea ergonómico, se hace sin vacilar (ej. cambiar sidebars por bottom-sheets).
- **Scroll táctil:** El scroll en móvil debe tener inercia natural y ser placentero.
- **Haptic feedback:** En móvil, combinar animaciones visuales con feedback háptico sutil cuando sea posible (vibración ligera en éxito).
- Mantener el mismo nivel de transparencia y refinamiento visual que en escritorio.

---

## 6. Menú de Ayuda e Intuición Primaria

- **Intuición como Pilar:** La intuición en el diseño es la prioridad absoluta al inicio del desarrollo.
- **Ayuda Integrada:** Toda aplicación debe incluir un menú de ayuda (visual o interactivo) que ilustre de manera extremadamente fácil cómo usar la app. El usuario nunca debe sentirse perdido.

---

## 7. Micro-interacciones y Animaciones

Todas las animaciones deben cumplir estos criterios:

- **Propósito:** Cada animación debe tener una función clara (confirmar, guiar, dar feedback, reducir ansiedad o generar placer).
- **Duración:** Cortas y elegantes (generalmente 200-400 ms). Nunca exceder 600 ms en celebraciones.
- **Suavidad:** 60 fps mínimo. Usar curvas de easing naturales (ease-out o `cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
- **Accesibilidad:** Respetar la preferencia `prefers-reduced-motion` del sistema operativo.
- **Adicción positiva:** Las interacciones deben generar una sensación de calidad y satisfacción que invite a volver.
- **Calma y premium:** Todo debe sentirse calmo y premium, nunca llamativo o infantil. Evitar animaciones excesivas que distraigan del contenido.

### Catálogo de Micro-interacciones

| Interacción | Animación |
|---|---|
| Botón presionado (toque) | Escala sutil hacia adentro (95%) + liberación suave |
| Campo de formulario validado | Check o línea minimalista que se dibuja suavemente |
| Cambio de pantalla / navegación | Fade + ligero desplazamiento vertical (estilo Liquid Glass) |
| Éxito general | Partículas muy sutiles o brillo suave (no abusar) |
| Carga inicial de pantalla | Elementos con stagger (uno tras otro con pequeño delay) para dar sensación de orden |
| Progreso completado | Pulso suave en barra (ligero escalado + opacidad) |
| Error | Sacudida sutil (2-3 vibraciones suaves) |

---

## 8. Arquitectura Frontend Inquebrantable

1. **Cero Tailwind CSS (Por Defecto):** Usamos **Vanilla CSS** con CSS Custom Properties (Variables).
2. **Arquitectura "Dumb":** Componentes React "tontos" acoplados a su archivo CSS homónimo (ej: `Card.tsx` + `card.css`).
3. **Tarjetas Premium:** Bordes ultra sutiles (1px `#E5E5E5`), fondo blanco puro, y sombras casi imperceptibles en reposo que se elevan al hover.
4. **Tipografías Semánticas:** Armonía absoluta. Outfit (Títulos), Inter (Cuerpo), Fira Code (Montos numéricos, SKUs). El agente puede sugerir otras si el proyecto lo demanda, pero la armonía es ley.

---

## 9. Gobernanza del Diseño

- **Revisión Obligatoria:** Todo nuevo flujo o funcionalidad debe pasar por una revisión de Transparencia Radical + Experiencia Visual antes de ser aprobado.
- **Feedback Directo:** La retroalimentación debe ser siempre sincera, directa y sin filtros. No se aceptan comentarios complacientes (ver `AI_RULES.md` §2).
- **Datos tabulares o complejos:** Se permite scroll o barras de desplazamiento sin forzar el diseño centrado.
- **Prioridad:** Las decisiones finales priorizan siempre **claridad + placer del usuario** por encima de cumplir el estándar al 100%.
- **Excepciones documentadas:** Toda excepción debe quedar documentada con su justificación técnica o de usabilidad.
- **Rigor con sentido común:** El estándar es riguroso porque busca excelencia, pero se aplica con sentido común y retroalimentación honesta del equipo.
