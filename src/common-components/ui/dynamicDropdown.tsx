import React, { useState, useRef } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  ListSubheader,
  TextField,
  InputAdornment,
  IconButton,
  styled,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Icon } from "@iconify/react";


interface DropdownOption {
  value: string;
  label: string;
}

interface DynamicDropdownProps {
  label?: string;
  name: string;
  value: string;
  options: DropdownOption[];
  placeholder?: string;
  onChange: (event: SelectChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  isSearch?: boolean;
  className?: string;
}

const CustomSelect = styled(Select)(() => ({
  "& .MuiSelect-select": {
    padding: "10px 12px",
    fontSize: "0.875rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    right: "8px",
  },
}));

const DynamicDropdown: React.FC<DynamicDropdownProps> = ({
  label,
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error,
  touched,
  isSearch = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions =
    options?.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleClearSearch = () => setSearchTerm("");

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

      <FormControl
        fullWidth
        disabled={disabled}
        sx={{
          borderRadius: "8px",
          border: error && touched ? "1px solid #DC2626" : "1px solid #D1D5DB",
          "&:hover": { borderColor: "#6366F1" },
          "&.Mui-focused": { borderColor: "#6366F1" },
        }}
      >
        <CustomSelect
          name={name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => {
            setOpen(false);
            setSearchTerm("");
          }}
          displayEmpty
          IconComponent={KeyboardArrowDown}
          renderValue={(selected: any) => {
            if (!selected) return placeholder;
            const selectedOption = options.find((o) => o.value === selected);
            return selectedOption ? selectedOption.label : placeholder;
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
                borderRadius: "8px",
                mt: 1,
              },
            },
          }}
        >
          {isSearch && (
            <ListSubheader sx={{ backgroundColor: "white", p: "8px 16px" }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Search..."
                value={searchTerm}
                inputRef={searchInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                InputProps={{
                  startAdornment: !searchTerm && (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch} size="small">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </ListSubheader>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, i) => (
              <MenuItem
                key={i}
                value={option.value}
                sx={{
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#6366F1", color: "white" },
                }}
              >
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options found</MenuItem>
          )}
        </CustomSelect>
      </FormControl>

      {error && touched && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <Icon icon="mingcute:warning-fill" width="14" height="14" />
          {error}
        </p>
      )}

    </div>
  );
};

export default DynamicDropdown;
