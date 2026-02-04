import { useState, useEffect, useCallback } from "react";
import { contactosService } from "@/services/contactos.service";
import { extractApiError } from "@/utils/mappers";

export const useContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContactos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactosService.getAll();
      setContactos(data);
    } catch (err) {
      setError(extractApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const createContacto = async (contacto) => {
    setLoading(true);
    setError(null);
    try {
      const newContacto = await contactosService.create(contacto);
      setContactos((prev) => [...prev, newContacto]);
      return { success: true, data: newContacto };
    } catch (err) {
      const errorMsg = extractApiError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

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
      const errorMsg = extractApiError(err);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteContacto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await contactosService.delete(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = extractApiError(err);
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
