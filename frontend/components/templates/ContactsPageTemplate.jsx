"use client";

import dynamic from "next/dynamic";
import { ContactTable } from "@/components/organisms";
import { PageHeader } from "@/components/molecules/PageHeader";
import { useContactosManagement } from "@/hooks/useContactosManagement";

export const ContactsPageTemplate = () => {
  const {
    dialogOpen,
    editingContact,
    searchTerm,
    filteredContactos,
    loading,
    error,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenChange,
    handleNewContact,
    handleSearchChange,
    fetchContactos,
  } = useContactosManagement();

  return (
    <div className="container mx-auto py-8 px-4">
      {/* HEADER DE LA PAGINA */}
      <PageHeader
        title="Contactos"
        description="Gestiona tu lista de contactos"
        onAction={handleNewContact}
        actionLabel="Nuevo Contacto"
      />

      {/* BARRA DE BUSQUEDA */}
      <div className="mb-6">
        <DynamicSearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre..."
          className="max-w-md"
        />
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            {filteredContactos.length} contacto(s) encontrado(s)
          </p>
        )}
      </div>

      {/* FORM DINAMICO TIPO POP-UP  */}
      <DynamicForDialog
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        initialData={editingContact}
        isLoading={loading}
      />

      {/* TABLA DE CONTACTOS */}
      <ContactTable
        contactos={filteredContactos}
        loading={loading && filteredContactos.length === 0}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={fetchContactos}
      />
    </div>
  );
};

// estos componentes se cargan solo en el cliente, cuando se necesitan
const DynamicForDialog = dynamic(
  () =>
    import("@/components/organisms/ContactFormDialog").then(
      (mod) => mod.ContactFormDialog,
    ),
  { ssr: false },
);

const DynamicSearchInput = dynamic(
  () =>
    import("@/components/molecules/SearchInput").then((mod) => mod.SearchInput),
  { ssr: false },
);
