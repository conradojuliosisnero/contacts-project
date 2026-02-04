/**
 * Mappers para transformar datos del API al formato interno del frontend
 */

export const mapContactoFromApi = (apiContacto) => {
  if (!apiContacto) return null;

  return {
    id: apiContacto.id,
    nombre: apiContacto.nombre || '',
    email: apiContacto.email || '',
    telefono: apiContacto.telefono || '',
    createdAt: apiContacto.createdAt || apiContacto.creado_en,
    updatedAt: apiContacto.updatedAt || apiContacto.actualizado_en,
  };
};

export const mapContactosFromApi = (apiContactos) => {
  if (!Array.isArray(apiContactos)) return [];
  return apiContactos.map(mapContactoFromApi);
};

export const mapContactoToApi = (contacto) => {
  return {
    nombre: contacto.nombre?.trim(),
    email: contacto.email?.trim(),
    telefono: contacto.telefono?.trim(),
  };
};

export const extractApiData = (response) => {
  if (response.success && response.data !== undefined) {
    return response.data;
  }
  if (response.data !== undefined) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return response;
};

export const extractApiError = (error) => {
  if (error.response?.data?.mensaje) {
    return error.response.data.mensaje;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Error desconocido';
};