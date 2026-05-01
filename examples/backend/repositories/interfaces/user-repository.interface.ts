// ─── Interfaz del repositorio (Contrato) ───
// ARCHITECTURE.md §5: Solo operaciones CRUD, cero lógica de negocio.
// El service depende de ESTA interfaz, no de la implementación.

import type { User, CreateUserDTO, UpdateUserDTO, UserFilter, PaginatedResponse } from "../models/user";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filter: UserFilter): Promise<PaginatedResponse<User>>;
  create(dto: CreateUserDTO & { passwordHash: string }): Promise<User>;
  update(id: string, dto: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
