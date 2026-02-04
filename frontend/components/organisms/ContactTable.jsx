"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms";
import { TableSkeleton, ErrorDisplay } from "@/components/molecules";
import { Edit, Trash2 } from "lucide-react";

export const ContactTable = ({
  contactos,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
}) => {
  if (loading) {
    return <TableSkeleton rows={6} columns={4} />;
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
        <p className="text-muted-foreground">No hay contactos que mostrar</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[80px]">ID</TableHead> */}
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead className="text-center w-[120px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contactos.map((contacto) => (
            <TableRow key={contacto.id}>
              {/* <TableCell className="font-medium">{contacto.id}</TableCell> */}
              <TableCell className="font-medium">{contacto.nombre}</TableCell>
              <TableCell className="text-muted-foreground">
                {contacto.email}
              </TableCell>
              <TableCell>{contacto.telefono}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(contacto)}
                    aria-label="Editar contacto"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(contacto.id)}
                    aria-label="Eliminar contacto"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
