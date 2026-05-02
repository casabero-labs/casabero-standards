# DESIGN_SYSTEM.md — Casabero Standard

Estandar de identidad visual para agentes AI que generan codigo UI en el ecosistema Casabero. Basado en [google-labs-code/design.md](https://github.com/google-labs-code/design.md).

## Que es un DESIGN.md

Archivo en la raiz del proyecto que combina:

- **YAML front matter** — tokens de diseño legibles por maquina
- **Markdown body** — explicacion humana de las decisiones visuales

El agente AI lee este archivo y aplica los tokens consistentemente en todo el codigo que genera. Elimina la variacion de colores, espaciados y tipografias entre sesiones.

## Cuando generar un DESIGN.md

Generar un `DESIGN.md` en la raiz del proyecto cuando:

1. El proyecto tiene interfaz de usuario (frontend web/mobile)
2. Se necesita definir o unificar la identidad visual
3. Se empieza un proyecto nuevo con UI
4. El agente va a generar componentes, paginas o estilos

**Nota:** Los proyectos Casabero que usan CSS custom properties (como los ejemplos en `examples/frontend/`) ya definen tokens en `:root`. El `DESIGN.md` es una capa **adicional** para proyectos que aun no tienen ese sistema o para proyectos nuevos donde el agente diseña desde cero.

## Estructura del archivo

### YAML Front Matter

```yaml
---
version: alpha
name: NombreDelProyecto
description: Descripcion breve del proyecto y su proposito
colors:
  # Usar escala monocromatica + 1 acento
  primary:    "#hex"
  secondary:  "#hex"
  neutral-50: "#hex"
  neutral-100:"#hex"
  neutral-200:"#hex"
  neutral-300:"#hex"
  neutral-400:"#hex"
  neutral-500:"#hex"
  neutral-600:"#hex"
  neutral-700:"#hex"
  neutral-800:"#hex"
  accent:     "#hex"
  error:      "#hex"
typography:
  font-heading: NombreFuente
  font-body:    NombreFuente
  h1:
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
shadow:
  card: "0 1px 3px rgba(0,0,0,0.04)"
  card-hover: "0 4px 16px rgba(0,0,0,0.08)"
  glass: "0 8px 32px rgba(0,0,0,0.06)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    borderRadius: "{rounded.md}"
    padding: "10px 16px"
  card:
    backgroundColor: "{colors.neutral-100}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.lg}"
    boxShadow: "{shadow.card}"
  input:
    borderRadius: "{rounded.md}"
    padding: "12px 16px"
    border: "1px solid {colors.neutral-200}"
---
```

### Body — Secciones en orden obligatorio

El body debe seguir este orden (se pueden omitir secciones vacias, nunca reordenar):

1. **Overview** — Marca, personalidad, audiencia objetivo, tono emocional
2. **Colors** — Paleta completa con rol semantico de cada color
3. **Typography** — Fuentes, escala tipografica, jerarquia
4. **Spacing** — Sistema de espaciado y cuando usar cada paso
5. **Elevation** — Sombras y capas de profundidad
6. **Shapes** — Estrategia de border-radius
7. **Components** — Comportamiento visual de componentes clave
8. **Dos and Donts** — Usos correctos e incorrectos

## Reglas de token

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Color | `#` + hex sRGB | `"#6366F1"` |
| Dimension | numero + unidad | `16px`, `1.5rem` |
| Token reference | `{path.to.token}` | `{colors.accent}` |
| Shadow | string | `"0 4px 16px rgba(0,0,0,0.08)"` |
| Typography | objeto | `fontFamily`, `fontSize`, `fontWeight`... |

**Reglas:**
- Colores deben ser hex sRGB. No usar `hsl()`, `rgb()` ni variables CSS
- Token reference solo apunta a primitivos o tokens compuestos (no anidar refs)
- Fuentes sin espacios van sin comillas en YAML
- DESIGN.md es un documento vivo: actualizar cuando el diseño evoluciona

## Aplicar tokens en codigo

Cuando el agente genera codigo UI, debe:

1. **Siempre** referenciar tokens del `DESIGN.md` en vez de inventar valores
2. **Nunca** hardcodear colores o espaciados sueltos
3. **Siempre** consultar `DESIGN.md` antes de escribir CSS/estilos
4. Si el proyecto tiene CSS custom properties (`:root` con `--`), sincronizar los valores

### Ejemplo de aplicacion correcta

```css
/* CORRECTO: tokens del DESIGN.md */
.button {
  background: var(--btn-bg, #6366F1);
  color: var(--btn-text, #ffffff);
  border-radius: var(--btn-radius, 8px);
  padding: 10px 16px;
  font-family: Inter, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: background 0.2s ease-out, transform 0.15s ease-out;
}

.button:hover {
  background: var(--btn-bg-hover, #4F46E5);
}

.button:active {
  transform: scale(0.95);
}
```

```tsx
/* CORRECTO: props referenciando tokens */
const Button = ({ label }: { label: string }) => (
  <button className="button">
    <span className="button__label">{label}</span>
  </button>
);
```

```css
/* INCORRECTO: valores inventados */
.button {
  background: #aabbcc;    /* no existe en DESIGN.md */
  padding: 8px 20px;      /* espaciado no definido */
  border-radius: 10px;     /* no definido en tokens */
}
```

## Validacion

Para verificar que un DESIGN.md cumple con el schema:

```bash
npx @google/design.md lint DESIGN.md
```

Para comparar dos versiones:

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

## Relacion con otros archivos Casabero

- `UX_UI_MANIFESTO.md` — Principios y filosofia de diseño (no tokens, conceptos)
- `DESIGN_SYSTEM.md` (este archivo) — Estandar para generar DESIGN.md en proyectos
- `examples/frontend/DESIGN.md` — Ejemplo completo con tokens reales Casabero
- `examples/frontend/*.css` — Implementacion CSS de los tokens de referencia

El `UX_UI_MANIFESTO.md` define el **por que** y la **filosofia**. Este archivo define el **como** y el **formato**. Los ejemplos CSS muestran la **implementacion practica**.

## Version

- Alpha — sujeto a cambios segun se valide en proyectos reales
- Basado en: google-labs-code/design.md spec
- Mantenido en: casabero-labs/casabero-standards
