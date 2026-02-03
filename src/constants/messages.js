// Mensajes de validación
export const VALIDATION_MESSAGES = {
  // Nombre
  NOMBRE_REQUERIDO: "El nombre es requerido",
  NOMBRE_LONGITUD: "El nombre debe tener entre 2 y 100 caracteres",

  // Email
  EMAIL_REQUERIDO: "El email es requerido",
  EMAIL_INVALIDO: "Debe ser un email válido",
  EMAIL_DUPLICADO: "Este email ya está registrado",

  // Teléfono
  TELEFONO_FORMATO:
    "El teléfono solo puede contener números y los caracteres + - ( ) espacios",
  TELEFONO_LONGITUD: "El teléfono no puede exceder 20 caracteres",

  // ID
  ID_INVALIDO: "El ID debe ser un número entero positivo",
};

// Mensajes de respuesta
export const RESPONSE_MESSAGES = {
  // Errores
  ERROR_VALIDACION: "Error de validación",
  ERROR_CONFLICTO: "Conflicto",
  ERROR_NO_ENCONTRADO: "No encontrado",
  ERROR_PARAMETRO_INVALIDO: "Parámetro inválido",
  ERROR_SERVIDOR: "Error del servidor",
  ERROR_PROCESAMIENTO: "Error al procesar la solicitud",

  // Éxitos
  CONTACTO_CREADO: "Contacto creado exitosamente",
  CONTACTO_ELIMINADO: "Contacto eliminado exitosamente",
  CONTACTO_NO_ENCONTRADO: (id) => `No se encontró el contacto con id ${id}`,
};

// Límites de validación
export const VALIDATION_LIMITS = {
  NOMBRE_MIN: 2,
  NOMBRE_MAX: 100,
  EMAIL_MAX: 100,
  TELEFONO_MAX: 20,
};
