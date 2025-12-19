import React from "react";
import { Icon } from "@iconify/react";

interface DynamicDatePickerProps {
    name: string;
    label?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    disabled?: boolean;
}

const DynamicDatePicker: React.FC<DynamicDatePickerProps> = ({
    name,
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    touched,
    disabled = false,
}) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                type="date"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled = {disabled}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md text-sm
          placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 
          ${error && touched ? "border-red-500" : "border-gray-300"}`}
            />
            {touched && error && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                    <Icon icon="mingcute:warning-fill" width="14" height="14" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default DynamicDatePicker;
