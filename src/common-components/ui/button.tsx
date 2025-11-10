// src/components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) => {
  const sizeCls = size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
  const variantCls =
    variant === "ghost"
      ? "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <button {...rest} className={`inline-flex items-center rounded-md ${sizeCls} ${variantCls} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
