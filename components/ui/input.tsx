import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-paris-dark-700">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl bg-white border border-paris-warm-300 text-paris-dark-900 placeholder-paris-warm-500 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-paris-gold-400 focus:border-paris-gold-500 transition-colors duration-150 shadow-sm",
            error && "border-rose-400 focus:ring-rose-400 focus:border-rose-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-paris-warm-600 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
