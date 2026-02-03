import { useState, useEffect, useCallback } from "react";
import { contactosService } from "@/services/contactos.service";

export const useContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los contactos
  const fetchContactos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactosService.getAll();
      setContactos(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener contactos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear contacto
  const createContacto = async (contacto) => {
    setLoading(true);
    setError(null);
    try {
      const newContacto = await contactosService.create(contacto);
      setContactos((prev) => [...prev, newContacto]);
      return { success: true, data: newContacto };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al crear contacto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar contacto
  const updateContacto = async (id, contacto) => {
    setLoading(true);
    setError(null);
    try {
      const updatedContacto = await contactosService.update(id, contacto);
      setContactos((prev) =>
        prev.map((c) => (c.id === id ? updatedContacto : c)),
      );
      return { success: true, data: updatedContacto };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al actualizar contacto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar contacto
  const deleteContacto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await contactosService.delete(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al eliminar contacto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactos();
  }, [fetchContactos]);

  return {
    contactos,
    loading,
    error,
    fetchContactos,
    createContacto,
    updateContacto,
    deleteContacto,
  };
};
