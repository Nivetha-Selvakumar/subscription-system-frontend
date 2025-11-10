// src/components/ui/input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...rest }) => {
  return (
    <input
      {...rest}
      className={`ui-input w-full border rounded-md py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 ${className}`}
    />
  );
};

export default Input;
