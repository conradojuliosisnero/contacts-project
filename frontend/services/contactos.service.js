import axiosInstance from "@/lib/axios";
import {
  mapContactoFromApi,
  mapContactosFromApi,
  mapContactoToApi,
  extractApiData,
} from "@/utils/mappers";
import { endpoints } from "@/config/config";

const { CONTACTOS_ENDPOINT } = endpoints;


export const contactosService = {
  // Obtener todos los contactos
  getAll: async () => {
    const response = await axiosInstance.get(CONTACTOS_ENDPOINT);
    const data = extractApiData(response.data);
    return mapContactosFromApi(data);
  },

  // Obtener un contacto por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`${CONTACTOS_ENDPOINT}/${id}`);
    const data = extractApiData(response.data);
    return mapContactoFromApi(data);
  },

  // Crear un nuevo contacto
  create: async (contacto) => {
    const payload = mapContactoToApi(contacto);
    const response = await axiosInstance.post(CONTACTOS_ENDPOINT, payload);
    const data = extractApiData(response.data);
    return mapContactoFromApi(data);
  },

  // Actualizar un contacto
  update: async (id, contacto) => {
    const payload = mapContactoToApi(contacto);
    const response = await axiosInstance.put(
      `${CONTACTOS_ENDPOINT}/${id}`,
      payload,
    );
    const data = extractApiData(response.data);
    return mapContactoFromApi(data);
  },

  // Eliminar un contacto
  delete: async (id) => {
    const response = await axiosInstance.delete(`${CONTACTOS_ENDPOINT}/${id}`);
    return response.data;
  },
};
