import { useState, useMemo } from "react";
import { useContactos } from "@/hooks/useContactos";
import { toast } from "sonner";

/**
 * Hook personalizado para manejar la lógica de gestión de contactos
 * Separa la lógica de negocio de la UI
 */
export const useContactosManagement = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    contactos,
    loading,
    error,
    createContacto,
    updateContacto,
    deleteContacto,
    fetchContactos,
  } = useContactos();

  // Filtrar contactos por nombre
  const filteredContactos = useMemo(() => {
    if (!searchTerm.trim()) {
      return contactos;
    }

    return contactos.filter((contacto) =>
      contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [contactos, searchTerm]);

  // Manejar envío del formulario (crear o actualizar)
  const handleSubmit = async (data) => {
    if (editingContact) {
      const result = await updateContacto(editingContact.id, data);
      if (result.success) {
        toast.success("Contacto actualizado", {
          description: `${data.nombre} ha sido actualizado correctamente.`,
        });
        setEditingContact(null);
        setDialogOpen(false);
      } else {
        toast.error("Error al actualizar", {
          description: result.error || "No se pudo actualizar el contacto.",
        });
      }
    } else {
      const result = await createContacto(data);
      if (result.success) {
        toast.success("Contacto creado", {
          description: `${data.nombre} ha sido agregado a tus contactos.`,
        });
        setDialogOpen(false);
      } else {
        toast.error("Error al crear", {
          description: result.error || "No se pudo crear el contacto.",
        });
      }
    }
  };

  // Abrir dialog para editar un contacto
  const handleEdit = (contacto) => {
    setEditingContact(contacto);
    setDialogOpen(true);
  };

  // Eliminar un contacto con confirmación
  const handleDelete = async (id) => {
    const contacto = contactos.find((c) => c.id === id);

    toast.promise(deleteContacto(id), {
      loading: "Eliminando contacto...",
      success: () => {
        return `${contacto?.nombre || "Contacto"} ha sido eliminado.`;
      },
      error: (err) => {
        return err?.error || "No se pudo eliminar el contacto.";
      },
    });
  };

  // Manejar cambios en el estado del dialog
  const handleOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setEditingContact(null);
    }
  };

  // Abrir dialog para crear nuevo contacto
  const handleNewContact = () => {
    setEditingContact(null);
    setDialogOpen(true);
  };

  // Manejar cambios en el término de búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return {
    // Estados
    dialogOpen,
    editingContact,
    searchTerm,
    contactos,
    filteredContactos,
    loading,
    error,

    // Handlers
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenChange,
    handleNewContact,
    handleSearchChange,
    fetchContactos,
  };
};
