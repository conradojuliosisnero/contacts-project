import { Router } from "express";
import { contactosController } from "../controllers/contactos.controller.js";
import { validateContacto, validateId } from "../middlewares/validators.js";

const router = Router();

// GET /contactos - Obtener todos los contactos
router.get("/", contactosController.getAll);

// POST /contactos - Crear nuevo contacto (con validación)
router.post("/", validateContacto, contactosController.create);

// DELETE /contactos/:id - Eliminar contacto (con validación de ID)
router.delete("/:id", validateId, contactosController.delete);

export default router;
