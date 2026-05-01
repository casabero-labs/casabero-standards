// ─── Composición Raíz (Dependency Injection sin librerías) ───
// ARCHITECTURE.md §9: Un solo lugar donde se crean todas las dependencias.
// Si querés cambiar PostgreSQL por Supabase, solo cambiás la línea del repository.

import express from "express";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";

// ─── 1. Infraestructura ───
const db = createDatabaseConnection(); // Tu conexión real
const app = express();

// ─── 2. Composición de dependencias (de abajo hacia arriba) ───
const userRepo = new UserRepository(db);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

// ─── 3. Middleware global ───
app.use(express.json());

// ─── 4. Rutas ───
app.get("/users", (req, res) => userController.list(req, res));
app.get("/users/:id", (req, res) => userController.getById(req, res));
app.post("/users", (req, res) => userController.create(req, res));
app.patch("/users/:id", (req, res) => userController.update(req, res));
app.delete("/users/:id", (req, res) => userController.delete(req, res));

// ─── 5. Arranque ───
app.listen(3000, () => console.log("Server running on port 3000"));

// ─── Placeholder ───
function createDatabaseConnection() {
  // En producción: Prisma, Drizzle, Supabase client, etc.
  return {} as any;
}
