import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "success" | "warning" | "danger" | "neutral" | "info";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "gold",
  size = "md",
  children,
  ...props
}) => {
  const variantStyles = {
    gold: "bg-paris-gold-100/70 text-paris-gold-800 border-paris-gold-300/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-paris-warm-100 text-paris-dark-700 border-paris-warm-300",
    info: "bg-sky-50 text-sky-700 border-sky-200",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-medium tracking-wide",
    md: "px-2.5 py-1 text-xs font-semibold tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border uppercase transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
