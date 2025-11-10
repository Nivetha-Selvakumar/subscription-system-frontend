import React from "react";
import { Icon } from "@iconify/react";

interface DynamicButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string; // optional iconify icon (e.g. "mdi:plus")
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  label,
  type = "button",
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const baseStyles = `
    flex items-center justify-center gap-2 px-4 py-2 rounded-md 
    text-sm font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants: Record<string, string> = {
    primary: `bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500`,
    secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400`,
    danger: `bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`,
    outline: `border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-400`,
  };

  const finalClass = `
    ${baseStyles}
    ${variants[variant]}
    ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={finalClass}
    >
      {loading ? (
        <Icon icon="eos-icons:loading" className="animate-spin" width={18} height={18} />
      ) : (
        icon && <Icon icon={icon} width={18} height={18} />
      )}
      {label}
    </button>
  );
};

export default DynamicButton;
