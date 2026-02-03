import {
  VALIDATION_MESSAGES,
  RESPONSE_MESSAGES,
  VALIDATION_LIMITS,
} from "../constants/messages.js";
import { REGEX_PATTERNS } from "../constants/regex.js";

export const validateContacto = (req, res, next) => {
  const { nombre, email } = req.body;
  const errors = [];

  // Validar nombre
  if (!nombre || nombre.trim() === "") {
    errors.push({
      campo: "nombre",
      mensaje: VALIDATION_MESSAGES.NOMBRE_REQUERIDO,
    });
  } else if (
    nombre.trim().length < VALIDATION_LIMITS.NOMBRE_MIN ||
    nombre.trim().length > VALIDATION_LIMITS.NOMBRE_MAX
  ) {
    errors.push({
      campo: "nombre",
      mensaje: VALIDATION_MESSAGES.NOMBRE_LONGITUD,
    });
  }

  // Validar email
  if (!email || email.trim() === "") {
    errors.push({
      campo: "email",
      mensaje: VALIDATION_MESSAGES.EMAIL_REQUERIDO,
    });
  } else {
    if (!REGEX_PATTERNS.EMAIL.test(email.trim())) {
      errors.push({
        campo: "email",
        mensaje: VALIDATION_MESSAGES.EMAIL_INVALIDO,
      });
    }
  }

  // Validar teléfono (opcional)
  if (req.body.telefono && req.body.telefono.trim() !== "") {
    const telefono = req.body.telefono.trim();

    if (!REGEX_PATTERNS.TELEFONO.test(telefono)) {
      errors.push({
        campo: "telefono",
        mensaje: VALIDATION_MESSAGES.TELEFONO_FORMATO,
      });
    }

    if (telefono.length > VALIDATION_LIMITS.TELEFONO_MAX) {
      errors.push({
        campo: "telefono",
        mensaje: VALIDATION_MESSAGES.TELEFONO_LONGITUD,
      });
    }
  }

  // Si hay errores, retornar
  if (errors.length > 0) {
    return res.status(400).json({
      error: RESPONSE_MESSAGES.ERROR_VALIDACION,
      detalles: errors,
    });
  }

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({
      error: RESPONSE_MESSAGES.ERROR_PARAMETRO_INVALIDO,
      mensaje: VALIDATION_MESSAGES.ID_INVALIDO,
    });
  }

  next();
};
