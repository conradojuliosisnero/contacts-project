import Contacto from "../models/Contacto.js";
import {
  RESPONSE_MESSAGES,
  VALIDATION_MESSAGES,
} from "../constants/messages.js";

// Función auxiliar para manejar errores
const handleError = (res, error, statusCode = 500) => {
  console.error("Error:", error);

  // Errores de validación de Sequelize
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: RESPONSE_MESSAGES.ERROR_VALIDACION,
      detalles: error.errors.map((e) => ({
        campo: e.path,
        mensaje: e.message,
      })),
    });
  }

  // Error de clave única duplicada
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: RESPONSE_MESSAGES.ERROR_CONFLICTO,
      mensaje: VALIDATION_MESSAGES.EMAIL_DUPLICADO,
    });
  }

  // Error genérico
  return res.status(statusCode).json({
    error: RESPONSE_MESSAGES.ERROR_SERVIDOR,
    mensaje:
      process.env.NODE_ENV === "development"
        ? error.message
        : RESPONSE_MESSAGES.ERROR_PROCESAMIENTO,
  });
};

export const contactosController = {
  // GET /contactos - Obtener todos los contactos
  getAll: async (req, res) => {
    try {
      const contactos = await Contacto.findAll({
        order: [["creado_en", "DESC"]],
      });

      res.json({
        success: true,
        total: contactos.length,
        data: contactos,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // POST /contactos - Crear un nuevo contacto
  create: async (req, res) => {
    try {
      const { nombre, email, telefono } = req.body;

      const nuevoContacto = await Contacto.create({
        nombre: nombre?.trim(),
        email: email?.trim().toLowerCase(),
        telefono: telefono?.trim() || null,
      });

      res.status(201).json({
        success: true,
        mensaje: RESPONSE_MESSAGES.CONTACTO_CREADO,
        data: nuevoContacto,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // DELETE /contactos/:id - Eliminar un contacto
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const contacto = await Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({
          error: RESPONSE_MESSAGES.ERROR_NO_ENCONTRADO,
          mensaje: RESPONSE_MESSAGES.CONTACTO_NO_ENCONTRADO(id),
        });
      }

      await contacto.destroy();

      res.json({
        success: true,
        mensaje: RESPONSE_MESSAGES.CONTACTO_ELIMINADO,
        data: { id: parseInt(id) },
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // GET /contactos/:id - Obtener un contacto por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const contacto = await Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({
          error: RESPONSE_MESSAGES.ERROR_NO_ENCONTRADO,
          mensaje: RESPONSE_MESSAGES.CONTACTO_NO_ENCONTRADO(id),
        });
      }

      res.json({
        success: true,
        data: contacto,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // PUT /contactos/:id - Actualizar un contacto
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, telefono } = req.body;

      const contacto = await Contacto.findByPk(id);

      if (!contacto) {
        return res.status(404).json({
          error: RESPONSE_MESSAGES.ERROR_NO_ENCONTRADO,
          mensaje: RESPONSE_MESSAGES.CONTACTO_NO_ENCONTRADO(id),
        });
      }

      await contacto.update({
        nombre: nombre?.trim(),
        email: email?.trim().toLowerCase(),
        telefono: telefono?.trim() || null,
      });

      res.json({
        success: true,
        mensaje: RESPONSE_MESSAGES.CONTACTO_ACTUALIZADO,
        data: contacto,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};
