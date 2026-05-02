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

### Escala Monocromática Base (CSS Custom Properties)

Toda app debe definir una escala de grises estructural que provea jerarquía visual sin depender del color. Esta escala es la base sobre la cual operan las animaciones de estado.

```css
:root {
  /* ─── Escala Monocromática (Light) ─── */
  --gray-50:  #f8fafc;   /* Fondo de página */
  --gray-100: #f1f5f9;   /* Fondo de superficie elevada */
  --gray-200: #e2e8f0;   /* Borde sutil / hover de botón */
  --gray-300: #cbd5e1;   /* Borde visible / skeleton */
  --gray-400: #94a3b8;   /* Texto placeholder / icono inactivo */
  --gray-500: #64748b;   /* Texto secundario / icono */
  --gray-600: #475569;   /* Texto de cuerpo */
  --gray-700: #334155;   /* Texto enfatizado */
  --gray-800: #1e293b;   /* Títulos */
  --gray-900: #0f172a;   /* Texto primario */
  --gray-950: #020617;   /* Máximo contraste */

  /* ─── Acentos (máx 3, brand + semántica) ─── */
  --accent-1: #3b82f6;   /* Acción / enlace / focus */
  --accent-2: #8b5cf6;   /* Secundario */
  --accent-3: #06b6d4;   /* Terciario / datos */
}

[data-theme="dark"] {
  /* ─── Escala Monocromática (Dark) ─── */
  --gray-50:  #0f172a;   /* Fondo de página */
  --gray-100: #1e293b;   /* Fondo de superficie elevada */
  --gray-200: #334155;   /* Borde sutil */
  --gray-300: #475569;   /* Borde visible / skeleton */
  --gray-400: #64748b;   /* Texto placeholder / icono inactivo */
  --gray-500: #94a3b8;   /* Texto secundario / icono */
  --gray-600: #cbd5e1;   /* Texto de cuerpo */
  --gray-700: #e2e8f0;   /* Texto enfatizado */
  --gray-800: #f1f5f9;   /* Títulos */
  --gray-900: #f8fafc;   /* Texto primario */
  --gray-950: #ffffff;   /* Máximo contraste */
}
```

**Reglas de uso de la escala:**

| Propósito | Token |
|---|---|
| Fondo de página / app shell | `--gray-50` |
| Fondo de cards, modales, superficies | `--gray-100` |
| Bordes de componentes (card, input, botón) | `--gray-200` (reposo), `--gray-300` (hover) |
| Skeleton loaders | `--gray-300` |
| Placeholders / texto inactivo | `--gray-400` |
| Texto secundario / íconos | `--gray-500` |
| Texto de cuerpo / párrafos | `--gray-600` |
| Texto enfatizado / labels | `--gray-700` |
| Títulos / headings | `--gray-800` |
| Texto primario (máximo contraste) | `--gray-900` |
| Acento de acción / focus / enlaces | `--accent-1` |
| Acento secundario | `--accent-2` |
| Acento terciario / visualización de datos | `--accent-3` |

**Prohibido:** usar valores hexadecimales crudos (`#e5e5e5`, `#64748b`) en componentes. Todo debe referenciar un token de la escala. Si un valor no existe en la escala, se evalúa si realmente es necesario o si un token existente cubre el caso.

---

## 4. Diseño Visual y Jerarquía (Liquid Glass)

Adoptar un enfoque **minimalista, elegante y premium** inspirado en el sistema Liquid Glass de Apple: materiales translúcidos, profundidad sutil, reflejos dinámicos y adaptabilidad entre claro/oscuro.

### Bordes Redondeados

**Todo elemento con esquinas debe tener bordes redondeados.** Cero esquinas en ángulo recto (0px border-radius). El radio varía según el tamaño del elemento:

| Elemento | Border radius |
|---|---|
| Botones, inputs, selects | `8px` |
| Cards, modales, paneles | `12px` |
| Avatares, toggles circulares | `50%` (círculo perfecto) |
| Badges, tags, chips | `6px` |
| Barras de progreso | `4px` |

La redondez contribuye a la sensación premium y amigable del diseño Liquid Glass. Las esquinas filosas se perciben como agresivas e incompletas.

### Jerarquía Visual

Priorizar la jerarquía mediante:
- Tamaño y peso tipográfico
- Espaciado generoso
- Capas con profundidad (efectos glassmorphism)
- Contenido siempre en primer plano

### Escala de Espaciado

Usar una escala de espaciado consistente basada en múltiplos de 4px. Nunca usar valores arbitrarios.

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | `4px` | Padding mínimo entre icono y texto |
| `--space-2` | `8px` | Gap entre chips/badges, separación de campos en formulario |
| `--space-3` | `12px` | Padding interno de inputs pequeños |
| `--space-4` | `16px` | Padding estándar de cards, gap entre secciones internas |
| `--space-5` | `20px` | Separación entre párrafos |
| `--space-6` | `24px` | Padding de cards y modales, gutter de grid |
| `--space-8` | `32px` | Separación entre secciones, margen superior de página |
| `--space-10` | `40px` | Separación entre secciones grandes |
| `--space-12` | `48px` | Margen de layout contenedor |
| `--space-16` | `64px` | Separación de hero sections |

### Sombras y Profundidad

Tres niveles de elevación para crear profundidad sin exagerar. Las sombras deben ser casi imperceptibles en reposo.

| Nivel | Light Mode | Dark Mode | Uso |
|---|---|---|---|
| **1 — Sutil** | `0 1px 3px rgba(0,0,0,0.04)` | `0 1px 3px rgba(0,0,0,0.3)` | Cards en reposo, inputs, selects |
| **2 — Elevado** | `0 4px 16px rgba(0,0,0,0.08)` | `0 4px 16px rgba(0,0,0,0.5)` | Cards en hover, modales, drawers, tooltips |
| **3 — Flotante** | `0 8px 32px rgba(0,0,0,0.12)` | `0 8px 32px rgba(0,0,0,0.6)` | Dropdowns abiertos, toasts, menús contextuales |

### Breakpoints Responsivos

| Nombre | Ancho mínimo | Dispositivo |
|---|---|---|
| `mobile` | `320px` | Teléfono pequeño |
| `tablet` | `768px` | Tablet vertical / teléfono horizontal |
| `desktop` | `1024px` | Laptop / tablet horizontal |
| `wide` | `1440px` | Desktop grande, TV |

### Iconos

Solo se permiten **iconos minimalistas en línea** (sin relleno ni color). Nada de iconos sólidos, coloridos o recargados.

### Layout en Pantalla Grande

En pantallas grandes (PC, TV): el contenido debe estar **centrado** y ajustarse a la pantalla sin barras de desplazamiento horizontal ni vertical siempre que la naturaleza de los datos lo permita.

---

## 5. Dark Mode y Responsividad Táctil

- **Dark Mode Obligatorio:** Toda app debe tener un modo oscuro cuidado a la perfección, controlable mediante un toggle (típicamente esquina superior derecha o inferior izquierda).
- **Responsive Intencional:** El click del mouse y el toque del dedo son diferentes. En pantallas móviles, los *touch targets* deben ser amplios (mínimo 44x44px). Si hay que cambiar drásticamente el layout para que el uso táctil sea ergonómico, se hace sin vacilar (ej. cambiar sidebars por bottom-sheets). Usar los breakpoints definidos en §4 como referencia (`mobile` 320px, `tablet` 768px, `desktop` 1024px).
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

## 8. Botones y Elementos Interactivos

**Principio rector:** La jerarquía y los estados de los botones se comunican mediante **posición, tamaño y animación**, nunca mediante colores semánticos. Esto garantiza una experiencia idéntica para usuarios con daltonismo o visión reducida.

### Estilo Unificado (base estructural, no semántica)

| Propiedad | Light Mode | Dark Mode |
|---|---|---|
| Fondo | `var(--gray-100)` | `var(--gray-100)` |
| Borde | `var(--gray-200)` | `var(--gray-200)` |
| Texto | `var(--gray-700)` | `var(--gray-700)` |
| Border radius | `8px` (§4) | `8px` (§4) |
| Padding estándar | `var(--space-3) var(--space-4)` | `var(--space-3) var(--space-4)` |
| Padding grande | `var(--space-3) var(--space-6)` | `var(--space-3) var(--space-6)` |

### Jerarquía Visual sin Color

La importancia de un botón se comunica exclusivamente por:

1. **Posición:** El botón de acción principal va primero (izquierda en LTR, derecha en diálogos).
2. **Tamaño:** Un botón grande (`14px 24px`) indica mayor relevancia que uno estándar.
3. **Peso tipográfico:** `font-weight: 600` en la acción principal, `400` en secundarias.
4. **Único o múltiple:** Si hay un solo botón, ocupa ancho completo; si hay varios, se agrupan.

### Animaciones de Estado (sin color semántico)

| Estado | Animación | Duración |
|---|---|---|
| **Hover (escritorio)** | Fondo se aclara sutilmente (`#E2E8F0` light / `#2D3748` dark) + borde `#CBD5E1` light / `#4A5568` dark — feedback estructural, no semántico | 200ms ease-out |
| **Pressed (toque/click)** | Escala al 95% + liberación con spring suave | 150ms |
| **Carga en progreso** | El texto se reemplaza por "…" con animación de elipsis pulsante. El botón permanece interactivo visualmente pero bloquea doble submit. | Loop hasta completar |
| **Acción completada** | Pulso suave (gentle scale + fade, ver §7) seguido del texto de confirmación por 2s | 600ms |
| **Acción destructiva** | Sacudida sutil (2-3 vibraciones horizontales, ver §7) al primer toque → aparece confirmación ("¿Eliminar?" / "Cancelar"). Sin color rojo. | 400ms sacudida |
| **Disabled** | Opacidad reducida al 40% + `cursor: not-allowed`. Sin hover effect. | Inmediato |
| **Focus (teclado)** | Outline sutil de 2px con el color de acento de la paleta (§3). Único uso de color permitido, por accesibilidad. | Inmediato |

### Reglas de Implementación

- **Un solo componente `Button`** para toda la app. No crear variantes `PrimaryButton`, `DangerButton`, etc.
- Las diferencias de comportamiento se pasan por props (`variant: "default" | "destructive"`), pero el estilo visual base **es el mismo** — solo cambia la animación al interactuar.
- El mensaje de confirmación para acciones destructivas se muestra **dentro del mismo botón** o en un texto adyacente, nunca en un modal separado a menos que la acción sea irreversible y masiva.
- Todos los estados se prueban con filtros de daltonismo (protanopia, deuteranopia, tritanopia) usando DevTools.

---

## 9. Arquitectura Frontend Inquebrantable

1. **Cero Tailwind CSS (Por Defecto):** Usamos **Vanilla CSS** con CSS Custom Properties (Variables).
2. **Arquitectura "Dumb":** Componentes React "tontos" acoplados a su archivo CSS homónimo (ej: `Card.tsx` + `card.css`).
3. **Tarjetas Premium:** Bordes ultra sutiles (var(--gray-200)), fondo var(--gray-100), sombras casi imperceptibles en reposo (nivel 1) que se elevan al hover (nivel 2). Ver §4.
4. **Tipografías Semánticas:** Armonía absoluta. Outfit (Títulos), Inter (Cuerpo), Fira Code (Montos numéricos, SKUs). El agente puede sugerir otras si el proyecto lo demanda, pero la armonía es ley.

#### Jerarquía Tipográfica Detallada

| Nivel | Familia | Tamaño | Peso | Line height | Uso |
|---|---|---|---|---|---|
| **h1** | Outfit | `2rem` (32px) | `700` | `1.2` | Título de página / hero |
| **h2** | Outfit | `1.5rem` (24px) | `600` | `1.3` | Título de sección |
| **h3** | Outfit | `1.25rem` (20px) | `600` | `1.3` | Título de card / modal |
| **h4** | Outfit | `1rem` (16px) | `600` | `1.4` | Subtítulo dentro de card |
| **body-lg** | Inter | `1.0625rem` (17px) | `400` | `1.6` | Párrafos principales |
| **body** | Inter | `0.9375rem` (15px) | `400` | `1.6` | Cuerpo estándar |
| **body-sm** | Inter | `0.8125rem` (13px) | `400` | `1.5` | Texto secundario, metadata |
| **caption** | Inter | `0.75rem` (12px) | `500` | `1.4` | Labels, badges, timestamps |
| **mono** | Fira Code | `0.9375rem` (15px) | `400` | `1.5` | Montos, SKUs, códigos, números |

---

## 10. Gobernanza del Diseño

### Catálogo de Componentes (Pre-Desarrollo Obligatorio)

**Antes de escribir una sola línea de código frontend**, se debe diseñar y aprobar un **catálogo completo de todos los elementos visuales** que aparecerán en la aplicación. Esto unifica el diseño y elimina incoherencias entre pantallas.

El catálogo debe documentar cada elemento con:

1. **Nombre del componente** (ej. `Button`, `Card`, `Modal`, `Navbar`)
2. **Todos sus estados** (reposo, hover, pressed, disabled, loading, success, error, empty)
3. **Todas sus variantes** (tamaños: standard/large, tipos: default/destructive)
4. **Comportamiento** (animaciones, transiciones, interacciones esperadas)
5. **Tokens de la escala monocromática** que usa (ver §3)
6. **Modo claro y oscuro** — ambos deben verse y funcionar correctamente

**Categorías mínimas del catálogo:**

| Categoría | Elementos obligatorios |
|---|---|
| **Navegación** | Navbar, Sidebar, Breadcrumbs, Tabs, Menú de ayuda (§6) |
| **Contenedores** | Card, Modal, Drawer, Panel, GlassCard (§4) |
| **Formularios** | Input, Textarea, Select, Checkbox, Radio, Toggle, DatePicker (§2) |
| **Botones** | Button (default + destructive), IconButton, Toggle de Dark Mode (§8, §5) |
| **Feedback** | ProgressBar (§1), Skeleton, Toast, EmptyState, ErrorState |
| **Datos** | Table, List, Pagination, Badge, Tag, Tooltip |
| **Tipografía** | Heading (h1-h4), Body, Caption, Label, montos numéricos (Fira Code) |

**Reglas del catálogo:**

- El catálogo se crea como un archivo `docs/design/CATALOG.md` en el proyecto.
- Cada componente listado debe tener una implementación de referencia en `src/components/`.
- **Prohibido:** crear componentes ad-hoc en pantallas que no estén en el catálogo. Si surge un nuevo elemento, primero se agrega al catálogo, se aprueba, y luego se implementa.
- El catálogo se revisa y aprueba antes de iniciar cualquier desarrollo de frontend.

- **Revisión Obligatoria:** Todo nuevo flujo o funcionalidad debe pasar por una revisión de Transparencia Radical + Experiencia Visual antes de ser aprobado.
- **Feedback Directo:** La retroalimentación debe ser siempre sincera, directa y sin filtros. No se aceptan comentarios complacientes (ver `AI_RULES.md` §2).
- **Datos tabulares o complejos:** Se permite scroll o barras de desplazamiento sin forzar el diseño centrado.
- **Prioridad:** Las decisiones finales priorizan siempre **claridad + placer del usuario** por encima de cumplir el estándar al 100%.
- **Excepciones documentadas:** Toda excepción debe quedar documentada con su justificación técnica o de usabilidad.
- **Rigor con sentido común:** El estándar es riguroso porque busca excelencia, pero se aplica con sentido común y retroalimentación honesta del equipo.
