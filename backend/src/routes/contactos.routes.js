import { Router } from "express";
import { contactosController } from "../controllers/contactos.controller.js";
import { validateContacto, validateId } from "../middlewares/validators.js";

const router = Router();

/**
 * @swagger
 * /contactos:
 *   get:
 *     summary: Obtener todos los contactos
 *     tags: [Contactos]
 *     description: Retorna una lista de todos los contactos registrados en la base de datos
 *     responses:
 *       200:
 *         description: Lista de contactos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", contactosController.getAll);

/**
 * @swagger
 * /contactos:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contactos]
 *     description: Crea un nuevo contacto con la información proporcionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactoInput'
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contacto creado exitosamente
 *                 contacto:
 *                   $ref: '#/components/schemas/Contacto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", validateContacto, contactosController.create);

/**
 * @swagger
 * /contactos/{id}:
 *   get:
 *     summary: Obtener un contacto por ID
 *     tags: [Contactos]
 *     description: Retorna un contacto específico según su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Contacto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", validateId, contactosController.getById);

/**
 * @swagger
 * /contactos/{id}:
 *   put:
 *     summary: Actualizar un contacto
 *     tags: [Contactos]
 *     description: Actualiza la información de un contacto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactoInput'
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contacto actualizado exitosamente
 *                 contacto:
 *                   $ref: '#/components/schemas/Contacto'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", validateId, validateContacto, contactosController.update);

/**
 * @swagger
 * /contactos/{id}:
 *   delete:
 *     summary: Eliminar un contacto
 *     tags: [Contactos]
 *     description: Elimina un contacto de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a eliminar
 *     responses:
 *       200:
 *         description: Contacto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contacto eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", validateId, contactosController.delete);

export default router;
