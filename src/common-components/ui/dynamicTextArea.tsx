import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface DynamicTextareaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  error?: string;
  touched?: boolean;
  className?: string;
}

const DynamicTextarea: React.FC<DynamicTextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  rows = 3,
  maxLength,
  error,
  touched,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full mb-3 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`rounded-md border transition-all duration-200 ${
          error && touched
            ? "border-red-500"
            : isFocused
            ? "border-indigo-500"
            : "border-gray-300"
        }`}
      >
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onChange={onChange}
          className={`w-full px-3 py-2 text-sm rounded-md outline-none resize-none bg-white
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
        />
      </div>

      {error && touched && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <Icon icon="mingcute:warning-fill" width="14" height="14" />
          {error}
        </p>
      )}
    </div>
  );
};

export default DynamicTextarea;
