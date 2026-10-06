import React from "react";
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-paris-warm-300 bg-paris-warm-50/50",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-paris-warm-100 flex items-center justify-center text-paris-gold-600 mb-4 shadow-sm">
        {icon || <FolderOpen className="w-7 h-7" />}
      </div>
      <h4 className="text-base font-bold text-paris-dark-800">{title}</h4>
      {description && <p className="text-sm text-paris-warm-600 max-w-sm mt-1">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
