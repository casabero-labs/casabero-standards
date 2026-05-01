# Diagramas de Arquitectura y Flujos

Documentación visual del ecosistema Casabero usando Mermaid (compatible con GitHub Markdown).

## Arquitectura General del Ecosistema

```mermaid
graph TB
    subgraph "Desarrollo"
        DEV[Desarrollador / Agente IA]
        GIT[GitHub - casabero-labs]
        CI[GitHub Actions CI/CD]
    end

    subgraph "Infraestructura"
        COOLIFY[Coolify - 192.168.1.7]
        DOCKER[Docker Containers]
    end

    subgraph "Aplicaciones"
        FRONTEND[Frontend Apps]
        API[API Backend]
        DB[(PostgreSQL)]
    end

    subgraph "Servicios"
        INFISICAL[Infisical - Secrets]
        SUPABASE[Supabase]
    end

    DEV -->|push code| GIT
    GIT -->|trigger| CI
    CI -->|deploy| COOLIFY
    COOLIFY -->|orchestrate| DOCKER
    DOCKER -->|serve| FRONTEND
    DOCKER -->|serve| API
    API -->|query| DB
    API -->|secrets| INFISICAL
    FRONTEND -->|API calls| API
    API -->|auth/storage| SUPABASE
```

## Flujo de Validación de Estándares

```mermaid
flowchart LR
    A[Código nuevo] --> B{¿docs/ existe?}
    B -->|No| C[❌ Rechazado]
    B -->|Sí| D{¿DEPLOYMENT.md?}
    D -->|No| E[⚠️ Advertencia]
    D -->|Sí| F{¿Secrets hardcodeados?}
    F -->|Sí| G[❌ Rechazado]
    F -->|No| H{¿Tests pasan?}
    H -->|No| I[❌ Rechazado]
    H -->|Sí| J[✅ Aprobado]
```

## Flujo de Deploy en Coolify

```mermaid
flowchart TD
    A[CI Finaliza OK] --> B[POST /api/v1/deploy?uuid=APP_UUID]
    B --> C[Capturar deployment_uuid]
    C --> D[Polling de estado]
    D --> E{¿Status?}
    E -->|finished| F[Verificar docker ps con tag esperado]
    E -->|failed| G[❌ Rollback / Alerta]
    E -->|canceled| G
    F --> H[Health check HTTP 200]
    H --> I[✅ Deploy validado]
```

## Flujo de Migración de Repositorio (casabero → casabero-labs)

```mermaid
flowchart TD
    A[App actual en casabero] --> B[Preparar rollback]
    B --> C[Migrar UNA app]
    C --> D[Deploy en nuevo origen]
    D --> E{¿Deploy exitoso?}
    E -->|Sí| F[Verificar health endpoint]
    E -->|No| G[Rollback a origen anterior]
    F --> H{¿Health 200?}
    H -->|Sí| I[✅ App migrada - Siguiente app]
    H -->|No| G
```

## Ciclo de Vida del Agente IA

```mermaid
flowchart TD
    A[Usuario da tarea] --> B[Agente carga AI_RULES.md]
    B --> C[Agente carga estándar de dominio]
    C --> D[Ejecuta tarea]
    D --> E{¿Tests OK?}
    E -->|No| F[Iterar fix]
    F --> D
    E -->|Sí| G[Documentar en docs/]
    G --> H[Actualizar AI_LOG.md]
    H --> I[Reportar: estado + próximo paso]
```
