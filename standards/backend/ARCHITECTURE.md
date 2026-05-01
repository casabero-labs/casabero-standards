# Arquitectura Backend Casabero

Estándar obligatorio de organización de código para cualquier backend del ecosistema Casabero.

El objetivo es eliminar el problema de *"toco algo y se rompe otra cosa"* mediante una arquitectura que hace cada cambio **local, predecible y seguro**.

## Principio Raíz: El Cambio Debe Ser Local

Si modificar una funcionalidad requiere tocar 5 archivos en 3 capas distintas, la arquitectura está mal. Un cambio bien diseñado toca **una capa** y como máximo **el contrato de su interfaz**.

Esto se logra con dos reglas:

1. **Cada capa tiene una responsabilidad única y no conoce los detalles internos de las otras.**
2. **Las capas se comunican exclusivamente mediante contratos (interfaces/types), nunca mediante imports directos de implementaciones.**

---

## 1. Arquitectura por Capas (Obligatoria)

```
src/
├── models/          # Tipos, interfaces, DTOs — el LENGUAJE de la app
├── repositories/    # Acceso a datos (DB, APIs externas)
├── services/        # Lógica de negocio
├── controllers/     # HTTP handlers (Express, Hono, Next.js API routes)
├── middleware/       # Auth, validación, rate limiting, logging
├── utils/           # Funciones puras sin efectos secundarios
└── config/          # Variables de entorno, configuración
```

### Regla de Dependencia (la más importante)

```
controllers → services → repositories → models
     ↓            ↓            ↓
  middleware    utils        config
```

**Las dependencias solo fluyen hacia abajo.** Nunca hacia arriba ni hacia los lados.

- `controllers/` conoce `services/` y `models/`
- `services/` conoce `repositories/` y `models/`
- `repositories/` solo conoce `models/`
- `models/` **no conoce a nadie** — es la capa más interna, sin dependencias

**Prohibido:**
- Un `service` importando un `controller`
- Un `repository` importando un `service`
- Una capa interna conociendo detalles de transporte (HTTP, WebSocket, etc.)

---

## 2. Modelos: El Lenguaje Único de la App

La carpeta `models/` es la **fuente de verdad** de toda la aplicación. Define:

```
models/
├── user.ts           # User, CreateUserDTO, UpdateUserDTO
├── product.ts        # Product, ProductFilter, ProductListResponse
├── order.ts          # Order, OrderItem, OrderStatus (enum)
├── common.ts         # PaginatedResponse<T>, ApiError, SortDirection
└── index.ts          # Re-exporta todo
```

### Reglas de modelos

- **Un archivo por entidad de negocio**, no por tabla de base de datos.
- Cada entidad tiene sus DTOs en el mismo archivo (Create, Update, Response, Filter).
- Los DTOs son explícitos: `CreateUserDTO` no es `Partial<User>`, es un tipo con campos exactos.
- Usar `type` para DTOs, `interface` solo cuando se requiere extensión.

### Por qué esto previene breakage

Cuando agregas un campo a `User`, el compilador te dice **exactamente** qué lugares necesitan actualizarse. No hay sorpresas en runtime.

---

## 3. Contratos entre Capas (Dependency Inversion)

Cada service expone una **interfaz** que es lo único que el controller conoce:

```typescript
// services/interfaces/user-service.interface.ts
export interface IUserService {
  getUserById(id: string): Promise<User>;
  createUser(dto: CreateUserDTO): Promise<User>;
  updateUser(id: string, dto: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
```

```typescript
// controllers/user.controller.ts
import type { IUserService } from "../services/interfaces/user-service.interface";

export class UserController {
  constructor(private userService: IUserService) {} // Depende de la interfaz, no de la implementación
}
```

### Beneficio directo

- Cambiar la implementación de `UserService` (ej. migrar de PostgreSQL a Supabase) **no toca el controller**.
- Testear el controller es trivial: inyectás un mock que implementa `IUserService`.
- Dos developers pueden trabajar en paralelo: uno en el controller, otro en el service.

---

## 4. Servicios: Donde Vive la Lógica

```
services/
├── interfaces/       # Contratos (IUserService, IProductService)
├── user.service.ts   # Implementación concreta
├── product.service.ts
└── index.ts          # Factory functions para instanciar servicios
```

### Reglas de servicios

- **Un servicio = una responsabilidad de negocio.** `UserService` maneja usuarios, no productos. `OrderService` maneja pedidos, no pagos (eso es `PaymentService`).
- **Cero lógica HTTP en servicios.** Un service no sabe qué es `req`, `res`, `status(200)`. Recibe datos planos y devuelve datos planos.
- **Validación de negocio en el service**, no en el controller. El controller solo valida que los datos *llegaron*, el service valida que los datos *tienen sentido*.
- **Errores de negocio como excepciones tipadas**, no como strings.

```typescript
// services/user.service.ts
export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    // Validación de negocio
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new BusinessError("EMAIL_ALREADY_EXISTS", "El email ya está registrado");
    }
    return this.userRepo.create(dto);
  }
}
```

---

## 5. Repositorios: La Única Capa que Toca la DB

```
repositories/
├── interfaces/       # IUserRepository, IProductRepository
├── user.repository.ts
├── product.repository.ts
└── index.ts
```

### Reglas de repositorios

- **Un repositorio por entidad**, no por tabla. Si `Order` usa 3 tablas, `OrderRepository` las maneja todas.
- **Nunca devuelven datos crudos del driver.** Siempre mapean a modelos.
- **Cero lógica de negocio.** Solo operaciones CRUD + queries.
- **Nunca lanzan errores HTTP.** Solo errores de datos (`NotFoundError`, `DuplicateError`).

---

## 6. Controladores: Solo Transporte

```
controllers/
├── user.controller.ts
├── product.controller.ts
└── index.ts
```

### Reglas de controladores

- **Solo 3 responsabilidades:**
  1. Extraer datos del request (params, body, query, headers)
  2. Llamar al service correspondiente
  3. Formatear la respuesta HTTP
- **Cero lógica de negocio.** Si hay un `if` que decide algo del dominio, va en el service.
- **Validación de entrada en middleware,** no en el controller.

```typescript
// controllers/user.controller.ts
export class UserController {
  constructor(private userService: IUserService) {}

  async create(req: Request, res: Response): Promise<void> {
    const dto: CreateUserDTO = req.body; // Ya validado por middleware
    const user = await this.userService.createUser(dto);
    res.status(201).json(user);
  }
}
```

---

## 7. Flujo de un Request (Ejemplo Concreto)

```
1. Middleware de auth       → Verifica JWT, adjunta userId al request
2. Middleware de validación → Valida body contra CreateUserDTO (Zod)
3. Controller.create()      → Extrae DTO del request, llama al service
4. UserService.createUser()  → Valida reglas de negocio, llama al repo
5. UserRepository.create()  → INSERT en DB, devuelve User model
6. Controller               → Responde 201 con el User
```

Cada capa hace **exactamente una cosa**. Si mañana cambiás la validación de Zod a Yup, solo tocás el middleware. Si cambiás PostgreSQL a Supabase, solo tocás el repository.

---

## 8. Testing: La Red de Seguridad

```
__tests__/
├── unit/
│   ├── services/       # Services con repos mockeados
│   └── utils/          # Funciones puras
├── integration/
│   └── repositories/   # Repos contra DB real o test container
└── e2e/
    └── api/            # HTTP requests contra la app levantada
```

### Estrategia

| Capa | Qué se testea | Cómo |
|---|---|---|
| Models | Tipos válidos | TypeScript compila = pasa |
| Utils | Funciones puras | Unit tests sin mocks |
| Services | Lógica de negocio | Unit tests con repos mockeados |
| Repositories | Queries SQL | Integration tests contra DB |
| Controllers | HTTP status + formato | E2E tests con DB real |
| Middleware | Auth, validación | Unit tests con req/res mockeados |

**Regla:** nunca testees dos capas en un mismo test. Si un test de controller falla porque la DB está mal configurada, el test es inútil para debuggear.

---

## 9. Inyección de Dependencias (DIY, sin librerías)

No se requiere NestJS ni Inversify. Un archivo `index.ts` por capa con factory functions es suficiente:

```typescript
// src/index.ts — composición raíz de la app
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";

const userRepo = new UserRepository(db);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

app.post("/users", (req, res) => userController.create(req, res));
```

---

## 10. Checklist de Calidad Arquitectónica

Antes de aprobar un PR, verificar:

- [ ] ¿El cambio toca más de 2 capas sin modificar un contrato? → **Red flag.**
- [ ] ¿Hay lógica de negocio en un controller? → **Rechazado.**
- [ ] ¿Hay código SQL o queries en un service? → **Rechazado.**
- [ ] ¿Un modelo importa de una capa externa? → **Rechazado.**
- [ ] ¿El service depende de una implementación concreta y no de una interfaz? → **Rechazado.**
- [ ] ¿Hay tests para la capa modificada? → Si no, agregarlos.
- [ ] ¿Agregar un campo a un modelo rompe tests en otra capa? → **Falla esperada**, actualizar solo el test, no el código.
