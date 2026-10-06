import React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, children, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-paris-dark-700">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl bg-white border border-paris-warm-300 text-paris-dark-900 text-sm appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-paris-gold-400 focus:border-paris-gold-500 transition-colors duration-150 shadow-sm pr-10",
              error && "border-rose-400 focus:ring-rose-400 focus:border-rose-500",
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-paris-warm-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
