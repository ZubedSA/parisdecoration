import React from "react";
import { cn } from "@/lib/utils";

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-paris-warm-200/70", className)}
      {...props}
    />
  );
};

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg"; className?: string }> = ({
  size = "md",
  className,
}) => {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div
        className={cn(
          "rounded-full border-paris-warm-300 border-t-paris-gold-500 animate-spin",
          sizeMap[size],
          className
        )}
      />
    </div>
  );
};
