# Casabero Standards

Repositorio central de estándares operativos, técnicos y de diseño para todo el ecosistema **Casabero**.

Este repo define las reglas inquebrantables que todo agente IA y desarrollador debe seguir al construir software en Casabero. Sirve como fuente única de verdad para:

- Comportamiento de agentes IA
- Diseño UX/UI
- Despliegue y DevOps
- Pruebas y QA
- Documentación

## Estructura

```
casabero-standards/
├── standards/           # Reglas maestras por dominio
│   ├── ai/              # Comportamiento de agentes IA
│   ├── frontend/        # Diseño y arquitectura frontend
│   └── devops/          # Despliegue, CI/CD, infraestructura
├── examples/            # Templates y snippets prácticos
│   ├── ai/              # Ejemplos de uso de AI Rules
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
| Frontend | [UX_UI_MANIFESTO.md](standards/frontend/UX_UI_MANIFESTO.md) | Sistema de diseño y arquitectura frontend |
| DevOps | [COOLIFY_DEPLOY_STANDARD.md](standards/devops/COOLIFY_DEPLOY_STANDARD.md) | Estándar de despliegue en Coolify |

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
