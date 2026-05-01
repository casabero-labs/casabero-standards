# Casabero Standards — OpenCode Agent Rules

Este es el archivo de reglas para OpenCode cuando se trabaja en este repositorio.

## Carga automática de estándares

Al iniciar sesión, OpenCode DEBE leer los siguientes archivos como contexto base obligatorio:

- `standards/ai/AI_RULES.md` — Comportamiento del agente
- `standards/backend/ARCHITECTURE.md` — Arquitectura backend
- `standards/frontend/UX_UI_MANIFESTO.md` — Diseño y experiencia de usuario
- `standards/devops/COOLIFY_DEPLOY_STANDARD.md` — Despliegue en Coolify
- `standards/security/SECURITY.md` — Checklist de seguridad
- `CONTRIBUTING.md` — Cómo contribuir a este repo

## Estructura del repositorio

```
casabero-standards/
├── standards/           # Reglas maestras por dominio
│   ├── ai/              # AI_RULES.md
│   ├── backend/         # ARCHITECTURE.md
│   ├── frontend/        # UX_UI_MANIFESTO.md
│   ├── devops/          # COOLIFY_DEPLOY_STANDARD.md
│   └── security/        # SECURITY.md
├── examples/            # Templates y snippets por dominio
├── diagrams/            # Diagramas Mermaid
├── scripts/             # validate.sh
├── AGENTS.md            # Este archivo
├── CHANGELOG.md         # Historial de versiones
├── CONTRIBUTING.md      # Guía para contribuir
└── README.md            # Propósito general
```

## Comandos

No hay build/lint/test en este repo porque es documentación pura. Para validar:

```bash
bash scripts/validate.sh .
```

## Convenciones

- Los estándares siguen versionado semántico. Cada cambio se registra en CHANGELOG.md.
- Secciones numeradas secuencialmente. Al agregar una sección, renumerar las siguientes.
- Ejemplos de código deben ser autocontenidos y funcionar con solo copiar el archivo.
- CSS: Vanilla con Custom Properties. TypeScript: strict mode. Sin librerías externas en ejemplos.
- Commits: usar formato `standards: verbo en presente`, español.
