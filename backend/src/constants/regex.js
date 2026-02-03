// Expresiones regulares para validación

export const REGEX_PATTERNS = {
  // Valida formato de email básico
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Valida teléfono: números, +, -, (, ), espacios
  TELEFONO: /^[0-9+\-\s()]*$/,
};
