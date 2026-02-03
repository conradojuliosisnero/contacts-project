import axiosInstance from "@/lib/axios";

const CONTACTOS_ENDPOINT = "/contactos";

export const contactosService = {
  // Obtener todos los contactos
  getAll: async () => {
    const response = await axiosInstance.get(CONTACTOS_ENDPOINT);
    return response.data;
  },

  // Obtener un contacto por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`${CONTACTOS_ENDPOINT}/${id}`);
    return response.data;
  },

  // Crear un nuevo contacto
  create: async (contacto) => {
    const response = await axiosInstance.post(CONTACTOS_ENDPOINT, contacto);
    return response.data;
  },

  // Actualizar un contacto
  update: async (id, contacto) => {
    const response = await axiosInstance.put(
      `${CONTACTOS_ENDPOINT}/${id}`,
      contacto,
    );
    return response.data;
  },

  // Eliminar un contacto
  delete: async (id) => {
    const response = await axiosInstance.delete(`${CONTACTOS_ENDPOINT}/${id}`);
    return response.data;
  },
};
