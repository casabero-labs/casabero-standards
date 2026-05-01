# ─── Ejemplo de AI Rules aplicadas en contexto ───
# Este archivo muestra cómo un agente IA debe interpretar y aplicar
# las reglas del estándar durante una sesión de desarrollo.
#
# Referencia: standards/ai/AI_RULES.md

# ------------------------------------------------------------
# §1 MISIÓN DE CÓDIGO — Checklist mental del agente
# ------------------------------------------------------------
# Antes de dar por terminado cualquier cambio, verificar:
#
# [ ] Funcional: ¿Pasa los tests? ¿Cubre el caso de uso?
# [ ] Seguro:  ¿Validé inputs? ¿Saniticé outputs? ¿Rutas protegidas?
# [ ] Escalable: ¿Funciona con 10,000 registros? ¿Query usa índice?
# [ ] Mantenible: ¿Se entiende en 5 minutos? ¿Nombre descriptivo?

# ------------------------------------------------------------
# §6 QA TOTAL — Flujo de pruebas obligatorio
# ------------------------------------------------------------
# 1. Tests de casos de uso (flujo natural del usuario)
# 2. Tests de seguridad (auth, RLS, inyección, XSS)
# 3. Tests de UX/UI (responsividad, dark mode, accesibilidad)
# 4. Documentar resultados en docs/qa_reports/

# ------------------------------------------------------------
# §7 DOCUMENTACIÓN — Estructura esperada
# ------------------------------------------------------------
# docs/
# ├── architecture/   # ADRs, diagramas, decisión de dependencias
# ├── phases/         # Bitácora por fase (phase-01-setup.md, etc.)
# ├── qa_reports/     # test-results-2026-05-01.md
# ├── deployments/    # deploy-2026-05-01-coolify.md
# └── AI_LOG.md       # "Hoy hice X, me trabé en Y, resolví con Z"

# ------------------------------------------------------------
# §9 DATA-DRIVEN — Telemetría obligatoria
# ------------------------------------------------------------
# Todo endpoint/core function debe emitir eventos trazables:
# - user_id, action, timestamp, metadata
# - No PII en logs
# - Panel admin debe exponer analíticas agregadas
