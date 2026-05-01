// ─── Servicio: Lógica de Negocio ───
// ARCHITECTURE.md §4: Cero HTTP, cero SQL, solo reglas del dominio.

import type { IUserService } from "./interfaces/user-service.interface";
import type { IUserRepository } from "../repositories/interfaces/user-repository.interface";
import type { User, CreateUserDTO, UpdateUserDTO, UserFilter, PaginatedResponse } from "../models/user";
import { DuplicateError, NotFoundError } from "../models/user";

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError("Usuario", id);
    return user;
  }

  async listUsers(filter: UserFilter): Promise<PaginatedResponse<User>> {
    return this.userRepo.findAll(filter);
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    // Validación de negocio: email único
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new DuplicateError("email", dto.email);

    // El hash de password se genera aquí o en un servicio de auth dedicado
    const passwordHash = await hashPassword(dto.password);

    return this.userRepo.create({ ...dto, passwordHash });
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    // Verificar que el usuario existe antes de actualizar
    await this.getUserById(id);
    return this.userRepo.update(id, dto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id); // Verifica existencia
    await this.userRepo.delete(id);
  }
}

// ─── Utilidad (en producción usar bcrypt/argon2) ───
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
