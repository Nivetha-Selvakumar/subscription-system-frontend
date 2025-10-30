import React, { useState } from "react";

interface DynamicInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: ((value: string) => void) | ((value: string, e: React.ChangeEvent<HTMLInputElement>) => void);
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  error?: string;
  className?: string;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  maxLength,
  error,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Supports both (value) => {} and (value, e) => {}
      if (onChange.length === 1) {
        (onChange as (value: string) => void)(e.target.value);
      } else {
        (onChange as (value: string, e: React.ChangeEvent<HTMLInputElement>) => void)(e.target.value, e);
      }
    } catch (err) {
      console.error("DynamicInput onChange error:", err);
    }
  };

  return (
    <div className="w-full mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        className={`w-full border rounded-md px-3 py-2 text-sm leading-[2.25rem] outline-none transition-all duration-200
          ${isFocused ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${error ? "border-red-500 ring-2 ring-red-200" : ""}
          ${className}`}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DynamicInput;
