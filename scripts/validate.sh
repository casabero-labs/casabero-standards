#!/bin/bash
# ─── Casabero Standards Validator ───
# Verifica que un proyecto cumpla con los estándares mínimos Casabero.
#
# Uso: ./validate.sh <ruta/proyecto>
#
# Checks:
#   1. Estructura docs/ mínima (AI_RULES.md §7)
#   2. DEPLOYMENT.md presente (AI_RULES.md §6)
#   3. Sin secrets hardcodeados (AI_RULES.md §3)
#   4. Linting configurado (warn si no)
#   5. Tests configurados (warn si no)

set -euo pipefail

PROJECT_DIR="${1:-}"
if [ -z "$PROJECT_DIR" ]; then
  echo "Uso: $0 <ruta/proyecto>"
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "ERROR: Directorio no encontrado: $PROJECT_DIR"
  exit 1
fi

PASS=0
FAIL=0
WARN=0

green()  { echo "  ✅ $1"; }
red()    { echo "  ❌ $1"; FAIL=$((FAIL + 1)); }
yellow() { echo "  ⚠️  $1"; WARN=$((WARN + 1)); }

echo "=============================================="
echo " Casabero Standards Validator"
echo " Proyecto: $PROJECT_DIR"
echo "=============================================="
echo ""

# ─── 1. Estructura docs/ ───
echo "── §7 Documentación obligatoria ──"

if [ -d "$PROJECT_DIR/docs" ]; then
  green "docs/ existe"
else
  red "docs/ no existe (AI_RULES.md §7)"
fi

for subdir in architecture phases qa_reports deployments; do
  if [ -d "$PROJECT_DIR/docs/$subdir" ]; then
    green "docs/$subdir/ existe"
  else
    red "docs/$subdir/ no existe (AI_RULES.md §7)"
  fi
done

if [ -f "$PROJECT_DIR/docs/AI_LOG.md" ]; then
  green "docs/AI_LOG.md existe"
else
  yellow "docs/AI_LOG.md no existe (recomendado)"
fi

# ─── 2. DEPLOYMENT.md ───
echo ""
echo "── §6 Manual de despliegue ──"

if [ -f "$PROJECT_DIR/DEPLOYMENT.md" ]; then
  green "DEPLOYMENT.md presente"
else
  yellow "DEPLOYMENT.md no encontrado (requerido si hay deploy)"
fi

# ─── 3. Secrets hardcodeados ───
echo ""
echo "── §3 Secrets ──"

SECRET_PATTERNS=(
  'api_key\s*=\s*["'"'"'][a-zA-Z0-9_-]{20,}["'"'"']'
  'token\s*=\s*["'"'"'][a-zA-Z0-9_.-]{20,}["'"'"']'
  'password\s*=\s*["'"'"'][^"'"'"']{4,}["'"'"']'
  'secret\s*=\s*["'"'"'][a-zA-Z0-9_-]{10,}["'"'"']'
  'DATABASE_URL\s*=\s*(postgres|mysql|mongodb)://[^[:space:]]+'
  'SUPABASE_KEY\s*=\s*["'"'"'][a-zA-Z0-9_.-]{20,}["'"'"']'
)

FOUND_SECRETS=0
for pattern in "${SECRET_PATTERNS[@]}"; do
  matches=$(grep -rnE "$pattern" "$PROJECT_DIR" \
    --include="*.ts" --include="*.tsx" --include="*.js" \
    --include="*.jsx" --include="*.py" --include="*.rb" \
    --include="*.go" --include="*.env" --include="*.yml" \
    --include="*.yaml" --include="*.md" \
    --exclude-dir="node_modules" \
    --exclude-dir=".git" \
    --exclude-dir="dist" \
    --exclude-dir="build" 2>/dev/null || true)

  if [ -n "$matches" ]; then
    echo "$matches" | while IFS= read -r line; do
      red "Posible secret hardcodeado: $line"
    done
    FOUND_SECRETS=$((FOUND_SECRETS + 1))
  fi
done

if [ "$FOUND_SECRETS" -eq 0 ]; then
  green "No se detectaron secrets hardcodeados"
fi

# ─── 4. Linting ───
echo ""
echo "── Linting ──"

if [ -f "$PROJECT_DIR/.eslintrc" ] || [ -f "$PROJECT_DIR/.eslintrc.js" ] || \
   [ -f "$PROJECT_DIR/.eslintrc.json" ] || [ -f "$PROJECT_DIR/.eslintrc.cjs" ] || \
   [ -f "$PROJECT_DIR/.eslintrc.mjs" ] || [ -f "$PROJECT_DIR/eslint.config.js" ] || \
   [ -f "$PROJECT_DIR/eslint.config.mjs" ]; then
  green "ESLint configurado"
else
  yellow "ESLint no configurado"
fi

if grep -q '"lint"' "$PROJECT_DIR/package.json" 2>/dev/null; then
  green "Script 'lint' en package.json"
else
  yellow "Script 'lint' no encontrado en package.json"
fi

# ─── 5. Tests ───
echo ""
echo "── Tests ──"

if [ -f "$PROJECT_DIR/jest.config.js" ] || [ -f "$PROJECT_DIR/jest.config.ts" ] || \
   [ -f "$PROJECT_DIR/vitest.config.ts" ] || [ -f "$PROJECT_DIR/vitest.config.js" ] || \
   grep -q '"test"' "$PROJECT_DIR/package.json" 2>/dev/null; then
  green "Tests configurados"
else
  yellow "No se detectó configuración de tests"
fi

# ─── 6. Estructura general ───
echo ""
echo "── Estructura general ──"

if [ -f "$PROJECT_DIR/README.md" ]; then
  green "README.md presente"
else
  yellow "README.md no encontrado"
fi

if [ -f "$PROJECT_DIR/.gitignore" ]; then
  green ".gitignore presente"
else
  yellow ".gitignore no encontrado"
fi

# ─── Resumen ───
echo ""
echo "=============================================="
echo " Resultado: $FAIL errores, $WARN advertencias"
echo "=============================================="

if [ "$FAIL" -gt 0 ]; then
  echo "❌ EL PROYECTO NO CUMPLE CON LOS ESTÁNDARES MÍNIMOS"
  exit 1
else
  echo "✅ El proyecto cumple con los estándares mínimos"
  exit 0
fi
