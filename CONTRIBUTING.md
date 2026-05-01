# Guía para Desarrolladores y Agentes IA

Cómo usar, aplicar y contribuir a los estándares Casabero.

## Aplicar estándares en un proyecto nuevo

### 1. Agentes IA

Todo agente IA que opere en un proyecto Casabero debe cargar como contexto inicial:

```
standards/ai/AI_RULES.md                    # Comportamiento base obligatorio
standards/backend/ARCHITECTURE.md            # Si el proyecto tiene backend
standards/security/SECURITY.md               # Obligatorio para todo proyecto
standards/frontend/UX_UI_MANIFESTO.md        # Si el proyecto tiene frontend
standards/devops/COOLIFY_DEPLOY_STANDARD.md  # Si el proyecto se despliega en Coolify
```

### 2. Desarrolladores humanos

- **Antes de escribir código**, lee el estándar del dominio correspondiente.
- Usa los ejemplos en `examples/` como plantilla de referencia.
- Ejecuta `scripts/validate.sh` antes de abrir un PR.

### 3. Estructura esperada en cada proyecto

Todo proyecto Casabero debe tener:

```
mi-proyecto/
├── docs/                  # Documentación obligatoria (ver AI_RULES.md §7)
│   ├── architecture/      # Decisiones de diseño
│   ├── phases/            # Bitácora de avances
│   ├── qa_reports/        # Resultados de tests
│   ├── deployments/       # Historial de despliegues
│   └── AI_LOG.md          # Bitácora del agente
├── DEPLOYMENT.md          # Manual de despliegue específico
└── .github/
    └── workflows/         # CI/CD
```

## Cómo contribuir a este repositorio

### Proponer un cambio en los estándares

1. Crea un branch: `git checkout -b proposal/nombre-del-cambio`
2. Haz tus cambios en los archivos de `standards/`.
3. Si el cambio lo requiere, actualiza `examples/` y `CHANGELOG.md`.
4. Abre un PR explicando:
   - **Qué** estándar se modifica.
   - **Por qué** es necesario el cambio.
   - **Impacto** en proyectos existentes.

### Agregar ejemplos

1. Coloca el ejemplo en `examples/<dominio>/`.
2. El código debe seguir estrictamente el estándar que ejemplifica.
3. Incluye comentarios que referencien la sección del estándar.

### Versionado

Este repo sigue versionado basado en cambios. Cada modificación a los estándares debe quedar registrada en `CHANGELOG.md` con:

- Fecha
- Tipo de cambio (added, changed, fixed, removed)
- Descripción concisa
- Impacto (breaking / non-breaking)

## Validación de cumplimiento

El script `scripts/validate.sh` verifica:

1. Existencia de `docs/` con estructura mínima.
2. Existencia de `DEPLOYMENT.md`.
3. Formato de código (si aplica linter configurado).
4. Secrets no hardcodeados en el código.
5. Cumplimiento de estándares de documentación.

Para CI/CD, usa el workflow de ejemplo en `.github/workflows/validate.yml`.
