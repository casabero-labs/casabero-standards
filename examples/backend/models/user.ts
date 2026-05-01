// ─── Modelos: El Lenguaje de la App ───
// ARCHITECTURE.md §2: Tipos explícitos, DTOs en el mismo archivo de la entidad.
// Los modelos NO dependen de ninguna capa externa.

// ─── Entidad principal (lo que devuelve la API) ───
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "manager" | "user" | "viewer";

// ─── DTO de creación (campos requeridos al registrar) ───
export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

// ─── DTO de actualización (solo campos que se pueden modificar) ───
// NUNCA usar Partial<User>. Cada campo es explícito.
export interface UpdateUserDTO {
  name?: string;
  avatarUrl?: string | null;
  role?: UserRole;
}

// ─── Filtros de búsqueda ───
export interface UserFilter {
  role?: UserRole;
  search?: string; // Busca en name y email
  page?: number;
  limit?: number;
}

// ─── Respuesta de listado paginado ───
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Errores tipados de negocio ───
export class BusinessError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "BusinessError";
  }
}

export class NotFoundError extends BusinessError {
  constructor(entity: string, id: string) {
    super("NOT_FOUND", `${entity} con id '${id}' no encontrado`, 404);
  }
}

export class DuplicateError extends BusinessError {
  constructor(field: string, value: string) {
    super("DUPLICATE", `El ${field} '${value}' ya está en uso`, 409);
  }
}
