/**
 * ─── AGENTS.md Template para Proyectos Casabero ───
 *
 * Copiar este archivo como AGENTS.md en la raíz de cualquier proyecto
 * del ecosistema Casabero. Reemplazar los placeholders.
 *
 * También crear opencode.json con:
 * {
 *   "instructions": [
 *     "https://raw.githubusercontent.com/casabero-labs/casabero-standards/main/standards/ai/AI_RULES.md",
 *     "https://raw.githubusercontent.com/casabero-labs/casabero-standards/main/standards/backend/ARCHITECTURE.md",
 *     "https://raw.githubusercontent.com/casabero-labs/casabero-standards/main/standards/frontend/UX_UI_MANIFESTO.md",
 *     "https://raw.githubusercontent.com/casabero-labs/casabero-standards/main/standards/devops/COOLIFY_DEPLOY_STANDARD.md",
 *     "https://raw.githubusercontent.com/casabero-labs/casabero-standards/main/standards/security/SECURITY.md"
 *   ]
 * }
 *
 * De esta forma OpenCode carga automáticamente los estándares al iniciar.
 * ============================================================================
 */

# [NOMBRE_DEL_PROYECTO] — Casabero
<!-- Descripción corta del proyecto, stack tecnológico, propósito -->

## Stack

- Frontend: React + TypeScript + Vanilla CSS
- Backend: [Node.js/Python/Go]
- DB: Supabase (PostgreSQL)
- Deploy: Coolify (192.168.1.7)
- Secrets: Infisical (secrets.casabero.com)

## Estándares Obligatorios

Los estándares Casabero se cargan automáticamente vía opencode.json.
El agente debe aplicar:

| Estándar | Cuándo aplica |
|---|---|
| `AI_RULES.md` | Siempre — comportamiento base |
| `ARCHITECTURE.md` | Backend — estructura de capas, modelos, contratos |
| `SECURITY.md` | Siempre — checklist de seguridad |
| `UX_UI_MANIFESTO.md` | Frontend — diseño, animaciones, componentes |
| `COOLIFY_DEPLOY_STANDARD.md` | Deploy — flujo de despliegue |

## Comandos

```bash
# Desarrollo
npm run dev           # Iniciar servidor de desarrollo
npm run build         # Build de producción

# Calidad
npm run lint          # ESLint + TypeScript
npm run typecheck     # Verificar tipos
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end

# Deploy (via script de Coolify)
bash scripts/deploy.sh
```

## Estructura del Proyecto

```
src/
├── models/           # Tipos, DTOs, interfaces — cero dependencias
├── repositories/     # Acceso a datos — solo conoce models/
├── services/         # Lógica de negocio — conoce repositories + models
├── controllers/      # HTTP handlers — conoce services + models
├── middleware/       # Auth, validación, rate limiting
├── components/       # Componentes React (frontend)
├── hooks/            # Custom hooks
└── utils/            # Funciones puras sin efectos secundarios
```

## Convenciones del Proyecto

<!-- Agregar aquí convenciones específicas del proyecto -->

- TypeScript strict mode obligatorio
- Naming: PascalCase para componentes, camelCase para funciones/variables
- CSS: Vanilla con Custom Properties, usar tokens de la escala monocromática
- Un archivo de estilos por componente (ej: `Button.tsx` + `Button.css`)
- Interfaces de servicio/repositorio en carpeta `interfaces/` dentro de cada capa
- Validación de inputs con Zod en middleware, validación de negocio en services

## Documentación

- `docs/architecture/` — Decisiones de diseño
- `docs/phases/` — Bitácora de avances
- `docs/qa_reports/` — Resultados de tests
- `docs/deployments/` — Historial de despliegues
- `docs/AI_LOG.md` — Bitácora del agente
- `DEPLOYMENT.md` — Manual de despliegue
