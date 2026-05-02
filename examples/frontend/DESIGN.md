---
version: alpha
name: Casabero Design System
description: Sistema de diseño base para aplicaciones Casabero. Aplicaciones web B2B y B2C con énfasis en claridad, velocidad percibida y profesionalismo. Adaptado de google-labs-code/design.md.

colors:
  # Escala monocromática neutra (usar solo estos grises)
  neutral-50:  "#f7f8f9"
  neutral-100: "#f1f5f9"
  neutral-200: "#e5e7eb"
  neutral-300: "#cbd5e1"
  neutral-400: "#9ca3af"
  neutral-500: "#6b7280"
  neutral-600: "#374151"
  neutral-700: "#1a1a1a"
  neutral-800: "#0f172a"
  # Acento único — azul suave (para focus, no para fondos)
  accent:      "#93c5fd"
  accent-dark: "#60a5fa"
  # Estados de error
  error:      "#ef4444"
  error-light:"#fca5a5"
  # Fondos para glass
  glass-bg-light:   "rgba(255, 255, 255, 0.55)"
  glass-bg-medium:  "rgba(255, 255, 255, 0.45)"
  glass-bg-heavy:   "rgba(255, 255, 255, 0.65)"
  glass-border-light:"rgba(255, 255, 255, 0.3)"
  glass-border-dark: "rgba(30, 30, 36, 0.55)"
  glass-shadow:     "0 8px 32px rgba(0, 0, 0, 0.06)"
  glass-shadow-hover:"0 12px 40px rgba(0, 0, 0, 0.1)"

typography:
  font-heading: "Outfit"
  font-body:    "Inter"
  font-mono:    "JetBrains Mono, monospace"
  # Escala: h1 > h2 > h3 > body-lg > body > body-sm > caption
  h1:
    fontFamily: "Outfit"
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Outfit"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
  h3:
    fontFamily: "Outfit"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: "Inter"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Inter"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "Inter"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4

spacing:
  1:  4px
  2:  8px
  3:  12px
  4:  16px
  5:  20px
  6:  24px
  8:  32px
  10: 40px
  12: 48px

rounded:
  sm:   6px
  md:   8px
  lg:   12px
  xl:   16px
  full: 9999px

shadow:
  card-resting:    "0 1px 3px rgba(0, 0, 0, 0.04)"
  card-hover:      "0 4px 16px rgba(0, 0, 0, 0.08)"
  card-hover-dark: "0 4px 16px rgba(0, 0, 0, 0.5)"
  glass:           "0 8px 32px rgba(0, 0, 0, 0.06)"
  glass-hover:     "0 12px 40px rgba(0, 0, 0, 0.1)"
  focus-ring:       "0 0 0 3px rgba(147, 197, 253, 0.25)"
  focus-ring-dark:  "0 0 0 3px rgba(96, 165, 250, 0.2)"

transition:
  fast:   "0.15s ease-out"
  base:   "0.2s ease-out"
  smooth: "0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

components:
  button-primary:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-700}"
    borderColor: "{colors.neutral-200}"
    borderRadius: "{rounded.md}"
    padding: "10px 16px"
    fontSize: "0.9375rem"
    fontWeight: "500"
    transition: "background {transition.base}, transform {transition.fast}"
    hover:
      backgroundColor: "{colors.neutral-200}"
      borderColor: "{colors.neutral-300}"
    active:
      transform: "scale(0.95)"
    disabled:
      opacity: "0.4"
      cursor: "not-allowed"
    focus:
      outline: "{shadow.focus-ring}"
      outlineOffset: "2px"

  button-large:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.neutral-700}"
    borderRadius: "{rounded.md}"
    padding: "14px 24px"
    fontSize: "1rem"
    fontWeight: "600"
    transition: "background {transition.base}, transform {transition.fast}"

  card:
    backgroundColor: "{colors.neutral-100}"
    borderColor: "{colors.neutral-200}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.6}"
    boxShadow: "{shadow.card-resting}"
    transition: "box-shadow {transition.smooth}, transform {transition.smooth}"
    hover:
      boxShadow: "{shadow.card-hover}"
      transform: "translateY(-2px)"

  card-glass:
    backgroundColor: "{colors.glass-bg-light}"
    borderColor: "{colors.glass-border-light}"
    borderRadius: "{rounded.xl}"
    backdropFilter: "blur(16px)"
    padding: "{spacing.6}"
    boxShadow: "{shadow.glass}"

  input:
    borderRadius: "{rounded.md}"
    padding: "12px 16px"
    border: "1px solid {colors.neutral-200}"
    backgroundColor: "#ffffff"
    fontSize: "1rem"
    transition: "border-color {transition.base}, box-shadow {transition.base}"
    focus:
      borderColor: "{colors.accent}"
      boxShadow: "{shadow.focus-ring}"
    placeholderColor: "{colors.neutral-300}"

---

## Overview

Sistema de diseño Casabero: minimalista, profesional, monocromatico. Una sola escala de grises con un acento azul suave para acciones de foco. Jerarquia por peso y tamano, no por color.

**Marca:** Aplicaciones web B2B/B2C en el ecosistema Casabero (Fidem, Flow, Karta-GIS, Magister, Menta).
**Audiencia:** Profesionales y empresas colombianas. No es para niños ni para gamers.
**Tono:** Claro, directo, funcional. Nada de gradientes ostentosos ni animaciones por animacion.
**Dark mode:** Soportado via inversion de tokens en `[data-theme="dark"]`. Los tokens oscuros son automáticos.

## Colors

- **neutral-700 (#1a1a1a):** Texto principal, headings, texto enfatizado
- **neutral-600 (#374151):** Texto secundario, labels
- **neutral-500 (#6b7280):** Texto terciario, placeholders
- **neutral-400 (#9ca3af):** Texto deshabilitado, iconos secundarios
- **neutral-300 (#cbd5e1):** Bordes de inputs, separadores suaves
- **neutral-200 (#e5e7eb):** Bordes de componentes, bordes de tarjetas
- **neutral-100 (#f1f5f9):** Fondo de superficie (cards, buttons)
- **neutral-50 (#f7f8f9):** Fondo de pagina
- **accent (#93c5fd):** UNICO uso: outline de focus-visible. No backgrounds, no text.
- **error (#ef4444):** Estados de error, mensajes criticos
- **Glass:** Fondos translucidos para overlays y modales sobre imagenes

## Typography

**Heading:** Outfit — sans-serif geometrica, moderna pero con personalidad
**Body:** Inter — legibilidad maxima en pantallas, optimizada para UI
**Mono:** JetBrains Mono — para codigo fuente

### Escala

| Nivel | Tamano | Peso | Uso |
|-------|--------|------|-----|
| h1 | 2.5rem | 700 | Titulos de pagina |
| h2 | 2rem | 600 | Secciones principales |
| h3 | 1.5rem | 600 | Subsecciones |
| body-lg | 1.125rem | 400 | Texto de lectura prolongada |
| body | 1rem | 400 | Default para UI |
| body-sm | 0.9375rem | 400 | Descripciones, metadata |
| label | 0.875rem | 500 | Labels de form, badges |
| caption | 0.75rem | 400 | Hints, timestamps |

## Spacing

Sistema de 4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48

| Token | Valor | Uso |
|-------|-------|-----|
| 1 (4px) | Espaciado micro: gap interno entre iconos y texto |
| 2 (8px) | Elementos cercanos: gap en wrappers, iconos |
| 3 (12px) | Inputs compactos |
| 4 (16px) | Padding estandar de componentes, gap en listas |
| 5 (20px) | Form rows, separacion de grupos |
| 6 (24px) | Padding principal de cards, secciones |
| 8 (32px) | Secciones grandes, gap entre cards |
| 10 (40px) | Secciones de pagina, hero spacing |
| 12 (48px) | Macros: separacion entre bloques de contenido |

## Elevation

Tres niveles de profundidad. No mas de tres.

| Nivel | Cuando |
|-------|--------|
| **Shadow card-resting** (0 1px 3px rgba(0,0,0,0.04)) | Elementos en reposo: cards, modals |
| **Shadow card-hover** (0 4px 16px rgba(0,0,0,0.08)) | Cards al hover, elementos elevados |
| **Shadow glass** (0 8px 32px rgba(0,0,0,0.06)) | Glass cards, overlays, backdrop |

## Shapes

- **6px (sm):** Chips, badges, elementos pequenos
- **8px (md):** Buttons, inputs, elementos de interaccion
- **12px (lg):** Cards, modals, contenedores medianos
- **16px (xl):** Glass cards, modals grandes, full-screen panels
- **9999px (full):** Pills, avatars, elementos circulares

## Components

### Button

Un solo estilo base. Toda la jerarquia viene de tamano y peso, no de color.

```
Standard: padding 10px 16px, font-size 0.9375rem, weight 500
Large:    padding 14px 24px, font-size 1rem,    weight 600
```

Estados: default > hover (gray-200) > active (scale 0.95) > disabled (opacity 0.4).
Focus: outline azul accent con offset. El UNICO uso de accent en todo el sistema.

Animaciones de estado: shake (destructivo), pulse (exito). Solo estas dos.

### Card

Borde sutil, fondo neutral-100, sombra en reposo. Eleva al hover.
Variante glass con backdrop-filter blur para superposiciones.

### Input

Un solo estilo. Focus ring azul. Placeholder gris-400.
Estados: default, focus, error (borde y shadow rojos), disabled (opacity reducida).

## Dos and Donts

### Hacer
- Usar la escala monocromatica completa para jerarquia
- Definir hover como un paso mas oscuro en la escala
- Usar glass cards para contenido sobre imagenes o fondos
- Aplicar animacion solo a hover, focus y active — nunca en reposo
- Soportar dark mode via inversion de tokens

### No hacer
- Usar mas de un color de acento/accent (el azul es solo para focus)
- Poner animaciones en estado de reposo
- Usar border-radius不一致 (seguir la escala definida)
- Hardcodear colores hex fuera de la escala
- Usar sombras de mas de 3 niveles diferentes
