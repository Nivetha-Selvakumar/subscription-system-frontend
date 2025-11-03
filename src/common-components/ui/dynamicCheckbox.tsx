import React from "react";

interface DynamicCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const DynamicCheckbox: React.FC<DynamicCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center text-sm">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label htmlFor={id} className="ml-2 text-gray-700 select-none">
        {label}
      </label>
    </div>
  );
};

export default DynamicCheckbox;
