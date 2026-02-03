"use client";

import { Input, Label } from "@/components/atoms";

export const FormField = ({ label, error, id, ...inputProps }) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className={error ? "text-destructive" : ""}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        className={error ? "border-destructive" : ""}
        {...inputProps}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
