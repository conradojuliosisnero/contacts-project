"use client";

import {
  ContactCard,
  ErrorDisplay,
  ContactCardSkeleton,
} from "@/components/molecules";

export const ContactList = ({
  contactos,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <ContactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorDisplay
          title="Error al cargar contactos"
          message={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (contactos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay contactos registrados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contactos.map((contacto) => (
        <ContactCard
          key={contacto.id}
          contacto={contacto}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
