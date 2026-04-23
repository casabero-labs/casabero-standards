# Coolify Deploy Standard (Casabero)

Estándar operacional para cualquier app del ecosistema Casabero desplegada en Coolify.

## 1) Flujo mínimo aceptado

1. Ejecutar pruebas de CI.
2. Encolar deploy real: `POST /api/v1/deploy?uuid=<APP_UUID>`.
3. Capturar `deployment_uuid`.
4. Polling de estado hasta `finished|failed|canceled`.
5. Verificar runtime (`docker ps` con tag esperado).
6. Verificar health endpoint público (HTTP 200).

## 2) Anti-patrones prohibidos

1. Marcar “deploy exitoso” solo porque CI terminó en verde.
2. Usar `restart` como sustituto de `deploy`.
3. Cambiar repositorio origen en múltiples apps a la vez sin rollback definido.
4. Persistir tokens/credenciales en documentación o código.

## 3) Seguridad de autenticación Git

Orden de preferencia:
1. GitHub App source configurado correctamente en Coolify.
2. Deploy keys por repositorio (si política de GitHub lo permite).
3. HTTPS con token como fallback temporal (con rotación posterior).

## 4) Criterio de salida

Un cambio de despliegue solo se considera cerrado cuando existe evidencia trazable de:
1. deployment terminado en `finished`,
2. commit/tag correcto en contenedores,
3. endpoint de salud operativo.
