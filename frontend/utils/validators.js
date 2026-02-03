// Validaciones para formularios
export const validators = {
  required: (value) => {
    return value?.trim() !== "" || "Este campo es requerido";
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Email inválido";
  },

  phone: (value) => {
    const phoneRegex = /^[0-9\s\-+()]{7,20}$/;
    return phoneRegex.test(value) || "Teléfono inválido";
  },

  minLength: (min) => (value) => {
    return value?.length >= min || `Mínimo ${min} caracteres`;
  },

  maxLength: (max) => (value) => {
    return value?.length <= max || `Máximo ${max} caracteres`;
  },
};

export const contactoValidation = {
  nombre: {
    required: validators.required,
    minLength: validators.minLength(2),
    maxLength: validators.maxLength(100),
  },
  email: {
    required: validators.required,
    validate: validators.email,
  },
  telefono: {
    required: validators.required,
    validate: validators.phone,
  },
};
