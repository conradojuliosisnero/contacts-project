"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/atoms";

export const ContactCard = ({ contacto, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{contacto.nombre}</CardTitle>
            <CardDescription>{contacto.email}</CardDescription>
          </div>
          <div className="flex gap-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Teléfono:</span> {contacto.telefono}
        </p>
      </CardContent>
    </Card>
  );
};
