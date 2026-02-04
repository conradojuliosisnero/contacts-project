import { Button } from "@/components/atoms";

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
        <Button onClick={onAction} size="lg" className="cursor-pointer">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
