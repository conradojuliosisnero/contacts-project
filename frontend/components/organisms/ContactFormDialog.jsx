"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms";
import { ContactForm } from "@/components/organisms";

export const ContactFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Contacto" : "Nuevo Contacto"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modifica la información del contacto"
              : "Completa el formulario para agregar un nuevo contacto"}
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          onSubmit={onSubmit}
          initialData={initialData}
          isLoading={isLoading}
          showActions={true}
        />
      </DialogContent>
    </Dialog>
  );
};
