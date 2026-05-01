// ─── Controlador: Solo Transporte HTTP ───
// ARCHITECTURE.md §6: Extrae datos del request, llama al service, formatea respuesta.
// Cero lógica de negocio aquí.

import type { Request, Response } from "express"; // Ejemplo con Express
import type { IUserService } from "../services/interfaces/user-service.interface";
import type { CreateUserDTO, UpdateUserDTO, UserFilter } from "../models/user";
import { BusinessError } from "../models/user";

export class UserController {
  constructor(private userService: IUserService) {}

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const filter: UserFilter = {
        role: req.query.role as UserFilter["role"],
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      };
      const result = await this.userService.listUsers(filter);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      // El DTO ya fue validado por el middleware de Zod
      const dto = req.body as CreateUserDTO;
      const user = await this.userService.createUser(dto);
      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as UpdateUserDTO;
      const user = await this.userService.updateUser(req.params.id, dto);
      res.json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // ─── Manejo centralizado de errores ───
  private handleError(error: unknown, res: Response): void {
    if (error instanceof BusinessError) {
      res.status(error.statusCode).json({
        error: error.code,
        message: error.message,
      });
      return;
    }

    console.error("Unexpected error:", error);
    res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Error interno del servidor",
    });
  }
}
