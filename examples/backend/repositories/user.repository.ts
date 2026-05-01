// ─── Implementación concreta del repositorio ───
// ARCHITECTURE.md §5: Mapea datos crudos de la DB a modelos.
// Esta es la única capa que conoce detalles de la base de datos.

import type { IUserRepository } from "./interfaces/user-repository.interface";
import type { User, CreateUserDTO, UpdateUserDTO, UserFilter, PaginatedResponse } from "../models/user";

// Simulamos una conexión a DB. En producción esto sería Prisma, Drizzle, Supabase client, etc.
interface Database {
  query(sql: string, params?: unknown[]): Promise<Record<string, unknown>[]>;
  execute(sql: string, params?: unknown[]): Promise<void>;
}

export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    const rows = await this.db.query(
      "SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );
    return rows.length ? this.toEntity(rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const rows = await this.db.query(
      "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
      [email.toLowerCase()]
    );
    return rows.length ? this.toEntity(rows[0]) : null;
  }

  async findAll(filter: UserFilter): Promise<PaginatedResponse<User>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;
    const offset = (page - 1) * limit;

    let where = "WHERE deleted_at IS NULL";
    const params: unknown[] = [];

    if (filter.role) {
      params.push(filter.role);
      where += ` AND role = $${params.length}`;
    }
    if (filter.search) {
      params.push(`%${filter.search}%`);
      where += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length})`;
    }

    const countResult = await this.db.query(
      `SELECT COUNT(*) as total FROM users ${where}`,
      params
    );
    const total = Number(countResult[0].total);

    const data = await this.db.query(
      `SELECT * FROM users ${where} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    return {
      data: data.map(this.toEntity),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(dto: CreateUserDTO & { passwordHash: string }): Promise<User> {
    const rows = await this.db.query(
      `INSERT INTO users (email, name, role, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [dto.email.toLowerCase(), dto.name.trim(), dto.role, dto.passwordHash]
    );
    return this.toEntity(rows[0]);
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const rows = await this.db.query(
      `UPDATE users SET name = COALESCE($1, name), role = COALESCE($2, role),
       updated_at = NOW() WHERE id = $3 AND deleted_at IS NULL RETURNING *`,
      [dto.name?.trim() ?? null, dto.role ?? null, id]
    );
    if (!rows.length) throw new Error("User not found"); // El service maneja esto
    return this.toEntity(rows[0]);
  }

  async delete(id: string): Promise<void> {
    await this.db.execute(
      "UPDATE users SET deleted_at = NOW() WHERE id = $1",
      [id]
    );
  }

  // ─── Mapper: datos crudos → modelo de dominio ───
  // Esta función es la única que conoce la estructura interna de la tabla.
  // Si la tabla cambia, solo se actualiza aquí.
  private toEntity(row: Record<string, unknown>): User {
    return {
      id: row.id as string,
      email: row.email as string,
      name: row.name as string,
      role: row.role as User["role"],
      avatarUrl: (row.avatar_url as string) ?? null,
      createdAt: (row.created_at as string),
      updatedAt: (row.updated_at as string),
    };
  }
}
