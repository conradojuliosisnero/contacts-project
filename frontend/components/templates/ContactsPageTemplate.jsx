"use client";

import { useState } from "react";
import { ContactFormDialog, ContactList } from "@/components/organisms";
import { Button } from "@/components/atoms";
import { useContactos } from "@/hooks/useContactos";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const ContactsPageTemplate = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const {
    contactos,
    loading,
    error,
    createContacto,
    updateContacto,
    deleteContacto,
    fetchContactos,
  } = useContactos();

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

  const handleEdit = (contacto) => {
    setEditingContact(contacto);
    setDialogOpen(true);
  };

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

  const handleOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setEditingContact(null);
    }
  };

  const handleNewContact = () => {
    setEditingContact(null);
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Contactos</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu lista de contactos
          </p>
        </div>
        <Button onClick={handleNewContact} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Contacto
        </Button>
      </div>

      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        initialData={editingContact}
        isLoading={loading}
      />

      <ContactList
        contactos={contactos}
        loading={loading && contactos.length === 0}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={fetchContactos}
      />
    </div>
  );
};
