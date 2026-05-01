#!/bin/bash
# ─── Coolify Deploy Script de referencia ───
# Basado en COOLIFY_DEPLOY_STANDARD.md §1
#
# Uso: ./deploy.sh <APP_UUID> <COOLIFY_API_URL> <API_TOKEN>
#
# Referencia: standards/devops/COOLIFY_DEPLOY_STANDARD.md

set -euo pipefail

APP_UUID="${1:-}"
COOLIFY_URL="${2:-http://192.168.1.7}"
API_TOKEN="${3:-}"

if [ -z "$APP_UUID" ] || [ -z "$API_TOKEN" ]; then
  echo "Uso: $0 <APP_UUID> <COOLIFY_API_URL> <API_TOKEN>"
  exit 1
fi

echo "=== Coolify Deploy Standard ==="

# 1. Encolar deploy real (NO restart)
echo "[1/4] Encolando deploy..."
DEPLOY_RESPONSE=$(curl -s -X POST \
  "${COOLIFY_URL}/api/v1/deploy?uuid=${APP_UUID}" \
  -H "Authorization: Bearer ${API_TOKEN}")

DEPLOYMENT_UUID=$(echo "$DEPLOY_RESPONSE" | grep -o '"deployment_uuid":"[^"]*"' | cut -d'"' -f4)

if [ -z "$DEPLOYMENT_UUID" ]; then
  echo "ERROR: No se obtuvo deployment_uuid"
  echo "Respuesta: $DEPLOY_RESPONSE"
  exit 1
fi

echo "  deployment_uuid: $DEPLOYMENT_UUID"

# 2. Polling hasta finished|failed|canceled
echo "[2/4] Esperando deploy..."
STATUS="queued"
ATTEMPTS=0
MAX_ATTEMPTS=60

while [ "$STATUS" != "finished" ] && [ "$STATUS" != "failed" ] && [ "$STATUS" != "canceled" ]; do
  sleep 5
  STATUS_RESPONSE=$(curl -s \
    "${COOLIFY_URL}/api/v1/deployments/${DEPLOYMENT_UUID}" \
    -H "Authorization: Bearer ${API_TOKEN}")
  STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
  echo "  status: $STATUS (intento $ATTEMPTS/$MAX_ATTEMPTS)"

  ATTEMPTS=$((ATTEMPTS + 1))
  if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    echo "ERROR: Timeout esperando deploy"
    exit 1
  fi
done

if [ "$STATUS" != "finished" ]; then
  echo "ERROR: Deploy terminó con status: $STATUS"
  exit 1
fi

echo "[3/4] Deploy finalizado exitosamente"

# 3. Verificar contenedor activo
echo "[4/4] Verificando health endpoint..."
sleep 3  # Dar tiempo al contenedor

# Asumimos URL pública estándar de Coolify
HEALTH_URL="https://${APP_UUID}.casabero.com/health"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo "  Health check: OK (HTTP 200)"
else
  echo "  Health check: WARN (HTTP $HTTP_CODE) - verificar manualmente"
fi

echo ""
echo "=== Deploy completado ==="
echo "  App UUID:      $APP_UUID"
echo "  Deployment:    $DEPLOYMENT_UUID"
echo "  Status final:  $STATUS"
echo "  Timestamp:     $(date -u +%Y-%m-%dT%H:%M:%SZ)"
