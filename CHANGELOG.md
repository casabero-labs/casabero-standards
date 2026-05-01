# Changelog

Todos los cambios notables a los estándares Casabero se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Estructura de carpetas por dominio (ai, frontend, devops)
- README.md con propósito general del repositorio
- CONTRIBUTING.md con guía para desarrolladores
- CHANGELOG.md para tracking de versiones
- Ejemplos prácticos en `examples/` (frontend, devops, ai)
- Diagramas de arquitectura y flujo de despliegue en `diagrams/`
- Script de validación `scripts/validate.sh`
- GitHub Actions workflow para CI/CD de validación (`.github/workflows/validate.yml`)
- `examples/frontend/ProgressBar.tsx/css`: barra de progreso con animaciones éxito/error sin color
- `examples/frontend/GlassCard.tsx/css`: tarjeta con efecto Liquid Glass (glassmorphism, profundidad, reflejos)

### Changed
- Reorganización de archivos: estándares movidos a `standards/<dominio>/`
- `UX_UI_MANIFESTO.md`: fusión con estándar de Transparencia Radical — documento expandido de 7 a 9 secciones con filosofía de complacencia, métricas concretas de feedback (800ms, 300ms, % real), animaciones éxito/error sin colores, diseño Liquid Glass completo, jerarquía visual, iconos en línea, micro-interacciones detalladas (catálogo), `prefers-reduced-motion`, haptic feedback móvil, y gobernanza del diseño
- `AI_RULES.md` §8: actualizada referencia al manifiesto expandido
- `AI_RULES.md` §1: actualizada referencia a los nuevos estándares de arquitectura y seguridad

### Changed
- `UX_UI_MANIFESTO.md` §3: agregada escala monocromática base (CSS Custom Properties `--gray-50` a `--gray-950`) con inversión automática light/dark. Prohibido usar hex crudos en componentes.
- `UX_UI_MANIFESTO.md` §8: reescrito con principio de animación sobre color — botón unificado sin colores semánticos (primario/destructivo), jerarquía por posición/tamaño/peso, todos los estados comunicados con animaciones, accesible para daltonismo
- `examples/frontend/Button.css`, `Card.css`: migrados a tokens de la escala monocromática (`--gray-*`, `--accent-*`)
- `examples/frontend/Button.tsx`: nuevo componente unificado con shake + confirmación para acciones destructivas, pulso para éxito, sin variantes de color

### Added
- `standards/backend/ARCHITECTURE.md`: arquitectura por capas (models → repositories → services → controllers), contratos con interfaces, regla de dependencia unidireccional, inyección de dependencias sin librerías, checklist de calidad arquitectónica
- `standards/security/SECURITY.md`: checklist de seguridad obligatorio (auth/RBAC, RLS, validación inputs, sanitización outputs, HTTP headers, CORS, dependencias, logging, pre-deploy)
- `examples/backend/`: app completa de ejemplo con la arquitectura por capas (models, repository + interfaz, service + interfaz, controller, composición raíz)
- `AGENTS.md`: reglas para OpenCode al trabajar en este repositorio
- `opencode.json`: carga automática de todos los estándares como contexto base
- `examples/ai/AGENTS_TEMPLATE.md`: template de AGENTS.md para copiar en cualquier proyecto Casabero, incluye opencode.json con URLs a los estándares

## [0.3.0] - 2026-05-01

### Added
- Regla crítica de Deploy en Coolify: distinción entre restart y deploy, polling de deployment_uuid, verificación de evidencia final.
- Protocolo de migraciones de repositorio (casabero → casabero-labs): una app por vez, ventana controlada, rollback definido, evidencia antes de continuar.

### Changed
- `AI_RULES.md §6`: agregada sección "Regla crítica de Deploy en Coolify" y "Migraciones de repositorio".
- `COOLIFY_DEPLOY_STANDARD.md`: expandido con anti-patrones prohibidos y seguridad de autenticación Git.

## [0.2.0] - 2026-04-30

### Added
- Sección 1 en `AI_RULES.md`: "Misión de Código" como pilar fundacional con 4 atributos no negociables (Funcional, Seguro, Escalable, Fácil de Entender).
- Sección 9 en `AI_RULES.md`: "Data-Driven Development" con recolección obligatoria de telemetría y analítica.

### Fixed
- Corrección de numeración en ambos documentos (`AI_RULES.md` y `UX_UI_MANIFESTO.md`).

## [0.1.0] - 2026-04-29

### Added
- `AI_RULES.md`: reglas base de comportamiento para agentes IA (secciones 1-8, 10).
- `COOLIFY_DEPLOY_STANDARD.md`: estándar operacional de despliegue en Coolify.
- `UX_UI_MANIFESTO.md`: sistema de diseño y arquitectura frontend.
