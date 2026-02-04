"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/components/atoms";
import dynamic from "next/dynamic";


const DynamicContactForm = dynamic(
  () => import("@/components/organisms/ContactForm"),
  {
    loading: () => <Skeleton className="h-72 w-full" />,
    ssr: false,
  }
);

export default function ContactFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {/* HEADER DIALOG  */}
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

        {/* FORMULARIO DE CONTACTO  */}
        <DynamicContactForm
          onSubmit={onSubmit}
          initialData={initialData}
          isLoading={isLoading}
          showActions={true}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
