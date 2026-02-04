"use client";

import { AlertCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms";
import { Button } from "@/components/atoms";

export const ErrorDisplay = ({
  title = "Error",
  message,
  onRetry,
  variant = "default", // 'default' | 'inline'
}) => {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <p className="flex-1">{message}</p>
      </div>
    );
  }

  return (
    <Card className="border-destructive/50 flex flex-col items-center justify-center">
      <CardHeader>
        <div className="w-100 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">{title}</CardTitle>
        </div>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      {onRetry && (
        <CardContent>
          <Button onClick={onRetry} variant="outline" size="sm">
            Reintentar
          </Button>
        </CardContent>
      )}
    </Card>
  );
};
