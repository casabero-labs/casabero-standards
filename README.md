# Casabero Standards

Repositorio central de estándares operativos, técnicos y de diseño para todo el ecosistema **Casabero**.

Este repo define las reglas inquebrantables que todo agente IA y desarrollador debe seguir al construir software en Casabero. Sirve como fuente única de verdad para:

- Comportamiento de agentes IA
- Arquitectura backend y organización de código
- Seguridad (auth, RLS, validación, headers)
- Diseño UX/UI y experiencia de usuario
- Despliegue y DevOps
- Pruebas y QA
- Documentación

## Estructura

```
casabero-standards/
├── standards/           # Reglas maestras por dominio
│   ├── ai/              # Comportamiento de agentes IA
│   ├── backend/         # Arquitectura y organización de código
│   ├── frontend/        # Diseño y arquitectura frontend
│   ├── devops/          # Despliegue, CI/CD, infraestructura
│   └── security/        # Auth, RLS, validación, headers
├── examples/            # Templates y snippets prácticos
│   ├── ai/              # Ejemplos de uso de AI Rules
│   ├── backend/         # App completa con arquitectura por capas
│   ├── frontend/        # Componentes y estilos de referencia
│   └── devops/          # Scripts de deploy y CI
├── diagrams/            # Diagramas de arquitectura y flujos
├── scripts/             # Herramientas de validación
├── CHANGELOG.md         # Historial de versiones
└── CONTRIBUTING.md      # Guía para contribuir
```

## Estándares

| Dominio | Documento | Descripción |
|---------|-----------|-------------|
| AI | [AI_RULES.md](standards/ai/AI_RULES.md) | Reglas universales de comportamiento para agentes IA |
| Backend | [ARCHITECTURE.md](standards/backend/ARCHITECTURE.md) | Arquitectura por capas, contratos, modelos |
| Frontend | [UX_UI_MANIFESTO.md](standards/frontend/UX_UI_MANIFESTO.md) | Sistema de diseño y experiencia de usuario |
| DevOps | [COOLIFY_DEPLOY_STANDARD.md](standards/devops/COOLIFY_DEPLOY_STANDARD.md) | Estándar de despliegue en Coolify |
| Seguridad | [SECURITY.md](standards/security/SECURITY.md) | Checklist de seguridad obligatorio |

## Uso rápido

1. Lee `CONTRIBUTING.md` para entender cómo aplicar estos estándares.
2. Todo agente IA debe cargar `standards/ai/AI_RULES.md` como contexto inicial.
3. Usa `examples/` como referencia de implementación correcta.
4. Ejecuta `scripts/validate.sh` para verificar cumplimiento de estándares en tu proyecto.

## Validación

```bash
# Verifica que un proyecto cumple con los estándares Casabero
./scripts/validate.sh /ruta/al/proyecto
```
