import { Button } from "@/components/atoms";
import { Plus } from "lucide-react";

/**
 * Header de página con título, descripción y acción principal
 * @param {Object} props
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción de la página
 * @param {Function} props.onAction - Callback para la acción principal
 * @param {string} props.actionLabel - Texto del botón de acción
 */
export const PageHeader = ({
  title,
  description,
  onAction,
  actionLabel = "Nuevo",
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {onAction && (
        <Button onClick={onAction} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
