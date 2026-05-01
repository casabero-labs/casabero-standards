// ─── Contrato del servicio ───
// ARCHITECTURE.md §3: El controller depende de esta interfaz, no de la implementación.

import type { User, CreateUserDTO, UpdateUserDTO, UserFilter, PaginatedResponse } from "../models/user";

export interface IUserService {
  getUserById(id: string): Promise<User>;
  listUsers(filter: UserFilter): Promise<PaginatedResponse<User>>;
  createUser(dto: CreateUserDTO): Promise<User>;
  updateUser(id: string, dto: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
