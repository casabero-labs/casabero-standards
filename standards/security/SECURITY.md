# Security Standard (Casabero)

Checklist de seguridad obligatorio para todo proyecto del ecosistema Casabero.

Este estándar es la implementación concreta del pilar **Seguro** definido en `AI_RULES.md` §1.

---

## 1. Autenticación y Autorización

### Auth

- [ ] Usar Supabase Auth o equivalente con JWT de corta duración (max 1h) + refresh token rotativo.
- [ ] Validar JWT en **cada request** mediante middleware. Nunca confiar en headers sin verificar firma y expiración.
- [ ] El middleware debe adjuntar `userId` y `role` al contexto del request. Nunca pasar el token crudo a capas inferiores.
- [ ] Endpoints públicos explícitamente declarados (ej. `/health`, `/auth/login`). Todo lo demás requiere auth por defecto.

### RBAC (Role-Based Access Control)

- [ ] Definir roles en un enum central (ej. `admin`, `manager`, `user`, `viewer`).
- [ ] Cada endpoint declara los roles permitidos. Middleware de autorización verifica antes de llegar al controller.
- [ ] **Prohibido:** verificar roles dentro del service o controller con `if (user.role === 'admin')`.

```typescript
// middleware/authorization.ts
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "POST /users": ["admin"],
  "GET /users": ["admin", "manager"],
  "GET /users/:id": ["admin", "manager", "user"], // Solo su propio ID
};
```

---

## 2. Row Level Security (RLS) en Base de Datos

- [ ] **Defensa en profundidad:** RLS en PostgreSQL/Supabase como última barrera, incluso si el backend ya filtra por `userId`.
- [ ] Políticas RLS explícitas para cada tabla con datos de usuario: `auth.uid() = user_id`.
- [ ] Nunca usar `service_role` key en el frontend. Esa key bypassea RLS y solo se usa en backend o edge functions.

```sql
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 3. Validación de Inputs

- [ ] **Todo input del exterior es malicioso hasta que se demuestre lo contrario.**
- [ ] Validar en 2 capas: middleware (formato/tipo) + service (reglas de negocio).
- [ ] Usar Zod, Yup o JSON Schema. Nunca validar a mano con `if (typeof x === 'string')`.
- [ ] Sanitizar strings: trim, escape HTML, limitar longitud máxima.
- [ ] Rechazar campos desconocidos (no aceptar `{ ...req.body }` sin filtrar).

```typescript
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email().max(255).trim().toLowerCase(),
  name: z.string().min(1).max(100).trim(),
  role: z.enum(["admin", "user"]),
}).strict(); // Rechaza campos no definidos
```

---

## 4. Sanitización de Outputs

- [ ] Todo dato que venga de la DB o del usuario y se renderice en HTML debe escaparse.
- [ ] Usar `textContent` en vez de `innerHTML` en el frontend.
- [ ] En APIs, nunca devolver `password_hash`, `refresh_token`, `internal_notes`, o cualquier campo sensible. Usar DTOs explícitos de respuesta que **excluyan** campos sensibles por tipo, no por filtro en runtime.
- [ ] Rate limiting en endpoints sensibles (login, registro, password reset).

---

## 5. Secrets y Configuración

- [ ] **Fuente única:** Infisical (`secrets.casabero.com`). Cero `.env` en el repositorio.
- [ ] El archivo `.env.example` solo contiene nombres de variables, nunca valores.
- [ ] Cargar secrets al iniciar la app. Validar que todos los secrets requeridos existen al arranque.
- [ ] Rotar secrets automáticamente cada 90 días o ante incidentes.

---

## 6. HTTP Security Headers

Headers obligatorios en todas las respuestas:

```typescript
{
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "0",              // Obsoleto pero no daña
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

---

## 7. CORS

- [ ] Lista blanca explícita de orígenes permitidos. **Nunca `Access-Control-Allow-Origin: *`.**
- [ ] En desarrollo, permitir `http://localhost:*`. En staging/prod, solo dominios de Casabero.

---

## 8. Dependencias

- [ ] `npm audit` o `pnpm audit` en CI. Build falla si hay vulnerabilidades **high** o **critical**.
- [ ] Dependencias fijadas con versiones exactas (`"4.2.1"`, no `"^4.2.1"`). El lockfile (`pnpm-lock.yaml`) commiteado.
- [ ] Revisar dependencias nuevas: ¿está mantenida? ¿cuántos maintainers? ¿tiene tests?

---

## 9. Logging y Monitoreo

- [ ] **Nunca loggear** PII (emails, nombres, teléfonos, IPs completas), tokens, passwords, o secrets.
- [ ] Logs estructurados en JSON: `{ level, message, timestamp, requestId, userId, action }`.
- [ ] Alertas automáticas ante: tasa de errores >5%, latencia p95 >2s, endpoints sin tráfico por >1h.

---

## 10. Checklist Pre-Deploy

Antes de cada deploy a producción:

- [ ] `npm audit` limpio (0 high/critical)
- [ ] Tests de seguridad pasan (auth bypass, inyección, XSS, IDOR)
- [ ] RLS policies verificadas en Supabase dashboard
- [ ] Secrets rotados si pasaron >90 días desde la última rotación
- [ ] Security headers presentes en todas las respuestas
- [ ] CORS configurado con dominios explícitos, no wildcard
- [ ] Rate limiting activo en endpoints de auth
- [ ] Sin secrets hardcodeados (ejecutar `scripts/validate.sh`)
