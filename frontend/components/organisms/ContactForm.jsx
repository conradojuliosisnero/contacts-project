"use client";

import { useForm } from "react-hook-form";
import { FormField } from "@/components/molecules";
import { Button, DialogFooter } from "@/components/atoms";
import { contactoValidation } from "@/utils/validators";

export const ContactForm = ({
  onSubmit,
  initialData,
  onCancel,
  isLoading,
  showActions = true,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || {
      nombre: "",
      email: "",
      telefono: "",
    },
  });

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <FormField
        label="Nombre"
        id="nombre"
        placeholder="Juan Pérez"
        error={errors.nombre?.message}
        {...register("nombre", contactoValidation.nombre)}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="juan@ejemplo.com"
        error={errors.email?.message}
        {...register("email", contactoValidation.email)}
      />

      <FormField
        label="Teléfono"
        id="telefono"
        placeholder="+52 123 456 7890"
        error={errors.telefono?.message}
        {...register("telefono", contactoValidation.telefono)}
      />

      {showActions && (
        <DialogFooter>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
          </Button>
        </DialogFooter>
      )}
    </form>
  );
};
