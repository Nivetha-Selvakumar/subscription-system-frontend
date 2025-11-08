// src/components/ui/badge.tsx
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "secondary";
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", children, className = "", ...rest }) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  const variantCls =
    variant === "success"
      ? "bg-green-100 text-green-800"
      : variant === "danger"
      ? "bg-red-100 text-red-800"
      : variant === "secondary"
      ? "bg-gray-100 text-gray-800"
      : "bg-indigo-100 text-indigo-800";

  return (
    <span className={`${base} ${variantCls} ${className}`} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
